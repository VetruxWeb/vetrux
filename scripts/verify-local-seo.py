#!/usr/bin/env python3
"""Verify the served Vetrux sitemap, metadata, hreflang, links and assets.

This is a local artifact check. It does not claim crawl, index, ranking or
real-user performance outcomes.
"""

from __future__ import annotations

import argparse
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path


PUBLIC_ORIGIN = "https://www.vetrux.tech"
LOCALES = {"de", "fr", "es", "it", "pt", "ja", "fi"}


@dataclass
class PageSignals:
    url: str
    status: int
    title: str = ""
    description: str = ""
    canonical: str = ""
    html_lang: str = ""
    robots: str = ""
    h1_count: int = 0
    alternates: dict[str, str] = field(default_factory=dict)
    links: list[str] = field(default_factory=list)
    images: list[str] = field(default_factory=list)
    json_ld: list[object] = field(default_factory=list)
    json_ld_errors: list[str] = field(default_factory=list)


class SignalParser(HTMLParser):
    def __init__(self, url: str, status: int) -> None:
        super().__init__(convert_charrefs=True)
        self.signals = PageSignals(url=url, status=status)
        self._in_title = False
        self._title_parts: list[str] = []
        self._in_json_ld = False
        self._json_ld_parts: list[str] = []

    @staticmethod
    def _attrs(attrs: list[tuple[str, str | None]]) -> dict[str, str]:
        return {key.lower(): value or "" for key, value in attrs}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = self._attrs(attrs)
        tag = tag.lower()
        if tag == "html":
            self.signals.html_lang = values.get("lang", "")
        elif tag == "title":
            self._in_title = True
        elif tag == "meta":
            name = values.get("name", "").lower()
            if name == "description":
                self.signals.description = values.get("content", "").strip()
            elif name == "robots":
                self.signals.robots = values.get("content", "").lower()
        elif tag == "link":
            rel = set(values.get("rel", "").lower().split())
            href = values.get("href", "").strip()
            if "canonical" in rel:
                self.signals.canonical = href
            if "alternate" in rel and values.get("hreflang") and href:
                self.signals.alternates[values["hreflang"].lower()] = href
        elif tag == "h1":
            self.signals.h1_count += 1
        elif tag == "a" and values.get("href"):
            self.signals.links.append(values["href"].strip())
        elif tag == "img" and values.get("src"):
            self.signals.images.append(values["src"].strip())
        elif tag == "script" and values.get("type", "").lower() == "application/ld+json":
            self._in_json_ld = True
            self._json_ld_parts = []

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self._title_parts.append(data)
        if self._in_json_ld:
            self._json_ld_parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "title":
            self._in_title = False
            self.signals.title = "".join(self._title_parts).strip()
        elif tag == "script" and self._in_json_ld:
            self._in_json_ld = False
            raw = "".join(self._json_ld_parts).strip()
            if raw:
                try:
                    self.signals.json_ld.append(json.loads(raw))
                except json.JSONDecodeError as error:
                    self.signals.json_ld_errors.append(str(error))


def fetch(url: str, timeout: float = 15.0) -> tuple[int, bytes, str]:
    request = urllib.request.Request(url, headers={"User-Agent": "VetruxLocalVerifier/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.status, response.read(), response.geturl()
    except urllib.error.HTTPError as error:
        return error.code, error.read(), error.geturl()


def fetch_status(url: str, timeout: float = 15.0) -> tuple[int, str]:
    request = urllib.request.Request(
        url,
        method="HEAD",
        headers={"User-Agent": "VetruxLocalVerifier/1.0"},
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.status, response.geturl()
    except urllib.error.HTTPError as error:
        return error.code, error.geturl()


def local_url(public_url: str, base_url: str) -> str:
    parsed = urllib.parse.urlsplit(public_url)
    suffix = urllib.parse.urlunsplit(("", "", parsed.path or "/", parsed.query, ""))
    return urllib.parse.urljoin(base_url.rstrip("/") + "/", suffix.lstrip("/"))


def locale_for_path(path: str) -> str:
    first = path.strip("/").split("/", 1)[0]
    return first if first in LOCALES else "en"


def normalize_public_url(url: str) -> str:
    parsed = urllib.parse.urlsplit(url)
    path = parsed.path.rstrip("/") or "/"
    return urllib.parse.urlunsplit((parsed.scheme.lower(), parsed.netloc.lower(), path, parsed.query, ""))


def public_target(href: str, page_url: str) -> str | None:
    if not href or href.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
        return None
    absolute = urllib.parse.urljoin(page_url, href)
    parsed = urllib.parse.urlsplit(absolute)
    if parsed.netloc not in {"www.vetrux.tech", "vetrux.tech"}:
        return None
    path = parsed.path or "/"
    if path.startswith(("/_next/", "/api/")):
        return None
    return urllib.parse.urlunsplit(("https", "www.vetrux.tech", path, parsed.query, ""))


def schema_types(value: object) -> list[str]:
    found: list[str] = []
    if isinstance(value, dict):
        schema_type = value.get("@type")
        if isinstance(schema_type, str):
            found.append(schema_type)
        elif isinstance(schema_type, list):
            found.extend(item for item in schema_type if isinstance(item, str))
        for child in value.values():
            found.extend(schema_types(child))
    elif isinstance(value, list):
        for child in value:
            found.extend(schema_types(child))
    return found


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", default="http://127.0.0.1:3000")
    parser.add_argument("--json-out")
    parser.add_argument("--markdown-out")
    args = parser.parse_args()

    errors: list[str] = []
    warnings: list[str] = []
    sitemap_status, sitemap_bytes, _ = fetch(f"{args.base_url.rstrip('/')}/sitemap.xml")
    if sitemap_status != 200:
        print(f"sitemap returned {sitemap_status}", file=sys.stderr)
        return 2

    root = ET.fromstring(sitemap_bytes)
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap_urls = [node.text.strip() for node in root.findall("sm:url/sm:loc", namespace) if node.text]
    pages: dict[str, PageSignals] = {}

    for index, public_url in enumerate(sitemap_urls, start=1):
        status, body, _ = fetch(local_url(public_url, args.base_url))
        page_parser = SignalParser(public_url, status)
        page_parser.feed(body.decode("utf-8", errors="replace"))
        signals = page_parser.signals
        pages[public_url] = signals

        expected_locale = locale_for_path(urllib.parse.urlsplit(public_url).path)
        if status != 200:
            errors.append(f"{public_url}: HTTP {status}")
        if not signals.title:
            errors.append(f"{public_url}: missing title")
        if not signals.description:
            errors.append(f"{public_url}: missing meta description")
        if normalize_public_url(signals.canonical) != normalize_public_url(public_url):
            errors.append(f"{public_url}: canonical={signals.canonical or 'missing'}")
        if signals.html_lang != expected_locale:
            errors.append(f"{public_url}: html lang={signals.html_lang or 'missing'}, expected={expected_locale}")
        if "noindex" in signals.robots:
            errors.append(f"{public_url}: unexpected noindex")
        if signals.h1_count != 1:
            warnings.append(f"{public_url}: h1_count={signals.h1_count}")
        if signals.json_ld_errors:
            errors.append(f"{public_url}: invalid JSON-LD ({'; '.join(signals.json_ld_errors)})")

        if index % 50 == 0:
            print(f"checked {index}/{len(sitemap_urls)} pages")

    title_groups: dict[str, list[str]] = {}
    for url, page in pages.items():
        title_groups.setdefault(page.title, []).append(url)
    for title, urls in title_groups.items():
        if title and len(urls) > 1:
            errors.append(f"duplicate title ({len(urls)}): {title} :: {', '.join(urls)}")

    pages_by_normalized_url = {normalize_public_url(url): page for url, page in pages.items()}
    for url, page in pages.items():
        current_locale = locale_for_path(urllib.parse.urlsplit(url).path)
        for hreflang, alternate_url in page.alternates.items():
            alternate_key = normalize_public_url(alternate_url)
            if hreflang == "x-default" or alternate_key not in pages_by_normalized_url:
                continue
            target = pages_by_normalized_url[alternate_key]
            if normalize_public_url(target.alternates.get(current_locale, "")) != normalize_public_url(url):
                errors.append(f"{url}: non-reciprocal hreflang {hreflang} -> {alternate_url}")

    internal_targets: set[str] = set()
    image_targets: set[str] = set()
    inbound = Counter()
    for page_url, page in pages.items():
        for href in page.links:
            target = public_target(href, page_url)
            if target:
                internal_targets.add(target)
                inbound[target] += 1
        for src in page.images:
            if src.startswith(("data:", "http://", "https://")):
                parsed = urllib.parse.urlsplit(src)
                if parsed.netloc not in {"www.vetrux.tech", "vetrux.tech"}:
                    continue
                image_targets.add(urllib.parse.urlunsplit(("https", "www.vetrux.tech", parsed.path, parsed.query, "")))
            elif src.startswith("/"):
                image_targets.add(f"{PUBLIC_ORIGIN}{src}")

    broken_links: list[str] = []
    for target in sorted(internal_targets):
        known_page = pages_by_normalized_url.get(normalize_public_url(target))
        if known_page:
            status, final_url = known_page.status, target
        else:
            status, final_url = fetch_status(local_url(target, args.base_url))
        if status >= 400:
            broken_links.append(f"{target}: HTTP {status} ({final_url})")
    errors.extend(f"broken internal link {item}" for item in broken_links)

    broken_images: list[str] = []
    for target in sorted(image_targets):
        status, _ = fetch_status(local_url(target, args.base_url))
        if status >= 400:
            broken_images.append(f"{target}: HTTP {status}")
    errors.extend(f"broken image {item}" for item in broken_images)

    orphan_sitemap_urls = sorted(url for url in sitemap_urls if url != f"{PUBLIC_ORIGIN}/" and inbound[url] == 0)
    if orphan_sitemap_urls:
        warnings.append(f"sitemap URLs without observed inbound links: {len(orphan_sitemap_urls)}")

    status_404, product_404_html, _ = fetch(f"{args.base_url.rstrip('/')}/products/does-not-exist")
    status_article_404, article_404_html, _ = fetch(f"{args.base_url.rstrip('/')}/blog/does-not-exist")
    if status_404 != 404:
        errors.append(f"unknown product returned {status_404}, expected 404")
    if status_article_404 != 404:
        errors.append(f"unknown article returned {status_article_404}, expected 404")
    for label, status, html in (
        ("unknown product", status_404, product_404_html),
        ("unknown article", status_article_404, article_404_html),
    ):
        parser = SignalParser(label, status)
        parser.feed(html.decode("utf-8", errors="replace"))
        if "noindex" not in parser.signals.robots:
            errors.append(f"{label} 404 is missing a noindex directive")

    report = {
        "tool": "verify-local-seo",
        "version": "1.0.0",
        "evidence_mode": "served_http_source",
        "base_url": args.base_url,
        "public_origin": PUBLIC_ORIGIN,
        "sitemap_url_count": len(sitemap_urls),
        "pages_checked": len(pages),
        "internal_targets_checked": len(internal_targets),
        "image_targets_checked": len(image_targets),
        "errors": errors,
        "warnings": warnings,
        "orphan_sitemap_urls": orphan_sitemap_urls,
        "json_ld_types": dict(Counter(schema_type for page in pages.values() for item in page.json_ld for schema_type in schema_types(item))),
        "boundary": "Artifact verification only; does not prove Google crawl, index, ranking, traffic, or business outcomes.",
    }

    markdown = "\n".join([
        "# Local served SEO verification",
        "",
        f"- Base URL: `{args.base_url}`",
        f"- Sitemap/pages checked: {len(pages)}",
        f"- Internal targets checked: {len(internal_targets)}",
        f"- Image targets checked: {len(image_targets)}",
        f"- Errors: {len(errors)}",
        f"- Warnings: {len(warnings)}",
        "- Boundary: artifact verification only; Google crawl/index/search effect remains unverified.",
        "",
        "## Errors",
        "",
        *(f"- {item}" for item in errors),
        *( ["- None"] if not errors else [] ),
        "",
        "## Warnings",
        "",
        *(f"- {item}" for item in warnings),
        *( ["- None"] if not warnings else [] ),
    ]) + "\n"

    if args.json_out:
        output = Path(args.json_out)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    if args.markdown_out:
        output = Path(args.markdown_out)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(markdown, encoding="utf-8")

    print(json.dumps({key: report[key] for key in ("pages_checked", "internal_targets_checked", "image_targets_checked", "errors", "warnings")}, ensure_ascii=False, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
