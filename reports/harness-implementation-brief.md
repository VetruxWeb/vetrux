# Vetrux static-first migration, completion, UI/UX, content, and SEO brief

Status: Codex baseline complete enough to start implementation. DeepSeek Harness dispatch is pending explicit user confirmation for third-party source transmission and destructive workspace edits.

Prepared: 2026-08-14 (America/Tijuana)

## Objective

Deliver a fast, production-ready Vetrux site whose public products, articles, and images are sourced from repository-local files rather than Supabase. Finish incomplete work, improve the complete public UI/UX, publish two genuinely localized articles in all eight supported languages, and remediate the full-site SEO audit. Preserve public functionality and existing canonical URLs.

Supported locales: `en`, `de`, `fr`, `es`, `it`, `pt`, `ja`, `fi`.

## Non-negotiable constraints

1. Do not commit or push. Codex will review and accept the diff.
2. Do not modify `.vibio/state/*.jsonl` or state hashes directly. Codex will use the Vibio state tool.
3. Do not delete or replace current public content before preserving the public, published Supabase-backed records in local source files.
4. Keep public inquiry, quote, and document-request delivery working through SMTP plus Turnstile. Remove only Supabase persistence from those routes.
5. Remove the Supabase runtime and dependency completely: no `@supabase/supabase-js`, Supabase imports, Supabase environment variables, REST calls, seed scripts, Prisma/Supabase schema workflow, or build-time database access.
6. Remove or deliberately decommission the database-backed admin CMS/auth/media/settings surfaces. A static-source model must not leave a broken `/admin` experience or dead admin APIs.
7. All site-owned public images and both new article hero images must be repository-local. Do not leave remote Unsplash URLs in Markdown/frontmatter.
8. Preserve stable public URLs unless a redirect and all internal references, canonicals, hreflang entries, and sitemap records are updated together.
9. Every claimed language version must contain translated main content, metadata, navigation strings, dates/read-time labels, TOC/FAQ labels, and CTA strings. Do not publish English body copy beneath non-English URLs.
10. Avoid unsupported regulatory, certification, medical, pricing, capacity, or performance claims. Keep batch- and destination-specific qualifications.

## Authoritative baseline

### Runtime and quality gates

- Next.js 15.5.15 App Router, React 19, TypeScript, Tailwind CSS 3.
- `npm ci`: passed previously.
- `npm test`: 15/15 tests passed previously.
- `npm run build`: compilation and Next type checking passed, then page-data collection failed with `Supabase not configured` at a localized product detail route.
- `npm run lint`: fails before linting because the ESLint/Next compatibility setup serializes a circular config. Fix the toolchain; do not suppress the script.
- Independent `npx tsc --noEmit --incremental false`: reports test narrowing errors even though the current Next build type phase passed. Provide a valid production/test TypeScript boundary or fix the tests.

### Supabase coupling

Supabase is used by:

- public product listings/details and product sitemap discovery;
- database-first article detail/listing and article sitemap discovery;
- inquiry, quote, and document-request database persistence;
- Auth.js credential lookup;
- admin dashboard, products, articles, media, inquiries, document requests, settings, and AI configuration;
- Prisma seed and repository scripts.

Repository-local content already exists, but is inconsistent:

- `src/content/articles/*.md`: 26 files; only 25 are registered in `fileOrder`; `final_article.md` is orphaned.
- all 26 article hero URLs currently point to remote Unsplash assets;
- localized blog listings use localized chrome but the same English metadata; localized article routes fall back to the same English Markdown body;
- `src/content/pages/products.data.ts` contains eight concentration-level products, while the live public Supabase listing contains two canonical products: `/products/cbd-isolate` and `/products/cbd-oil`;
- repository-local `product.content.ts` already contains richer localized CBD-isolate copy, but the current public dynamic product route uses `productData.ts` and does not consume it;
- `ProductPageClient.tsx` appears unused by public routes.

### Half-finished and drift findings

- `src/components/admin/ProductForm.tsx` includes `VARIANTS_PLACEHOLDER` and `TRANSLATIONS_PLACEHOLDER` markers.
- The admin CMS is incompatible with the requested static-source architecture and cannot remain half-functional.
- README still describes an old Vite/React Router/port 5173 setup instead of the actual Next.js application.
- product navigation and current local product models disagree.
- `final_article.md` exists but is not indexed or rendered.
- locale routes duplicate large page modules rather than sharing a locale-aware route implementation, increasing drift risk.
- localized article fallback pages expose English main content under non-English URLs.

### Live UI/UX evidence

- Homepage desktop structure is generally clear: fixed navigation, visible primary/secondary CTAs, capability strip, semantic headings, skip link, contact block, and footer.
- Product cards render with a large blank image area until lazy images arrive; provide a stable local placeholder/background and verify dimensions/preloading strategy.
- Product listing currently has two high-level products (`cbd-isolate`, `cbd-oil`), while local data has eight concentration slugs. Preserve the two high-level canonical pages and express concentrations as variants/specifications unless there is an intentional, redirected IA change.
- Language switching preserves the current path, but every destination must exist and contain true localized content.
- Article chrome contains hard-coded English strings such as “Back to Blog”, “All Posts”, “Print / Save PDF”, and likely TOC/FAQ labels; localize them.
- Review keyboard dropdown behavior, escape-to-close, focus return, mobile menu scroll lock, and current-page state. Validate touch targets and reduced motion.

### SEO baseline

`reports/seo-baseline-http.json` and `reports/seo-baseline-http.md` were generated with the Vibio crawler in HTTP-source mode against production.

- sitemap: 186 URLs;
- sampled/parsed: 72 pages (crawl budget did not cover every sitemap URL);
- status sample: 72 × HTTP 200;
- 0 critical, 0 high, 13 medium, 1 low, 1 info findings;
- 11 orphan-in-scope pages in the sampled graph;
- 31 pages reachable from the root, maximum sampled click depth 3;
- duplicate titles among overlapping COA articles;
- generic duplicate German titles/descriptions across ten blog/gallery URLs;
- `WebSite` structured data appears on every sampled page because it is injected by the root layout;
- sitemap assigns “today” as `lastModified` to most static/localized routes, which is not a truthful modification signal;
- sitemap still depends on Supabase for product and article discovery;
- article topics overlap materially: two COA-reading guides, two EU/Novel Food guides, and two extraction-comparison guides.

Google's current guidance requires `WebSite` site-name markup on the domain homepage, self-referencing and reciprocal hreflang clusters for real localized versions, visible content in the claimed language, and truthful sitemap modification dates. `changefreq` and `priority` do not influence Google crawling.

## Implementation phases

### Phase 1 — Preserve and normalize public content locally

1. Extract/reconstruct the two live public product records, their eight-locale translations, variants, quantity tiers, specs, image galleries, and metadata into typed repository-local data.
2. Reconcile richer existing CBD-isolate content with the live product detail. Keep `/products/cbd-isolate` and `/products/cbd-oil` canonical.
3. Introduce one typed local article model capable of per-locale metadata/body content and deterministic enumeration without a manually drifting `fileOrder` list.
4. Download/replace every remote article hero image with optimized local assets, retaining provenance/license notes where applicable.
5. Verify every referenced image exists under `public/`, has dimensions/alt text, and is compatible with `next/image`.

### Phase 2 — Remove Supabase and obsolete backend surfaces

1. Replace public product/article queries and sitemap discovery with synchronous or cached local-file reads suitable for static generation.
2. Remove `force-dynamic` where no request-time behavior remains; use `generateStaticParams` for all localized article/product detail routes.
3. Remove Supabase inserts from public form routes but preserve validation, origin checks, rate limiting, Turnstile, SMTP, success/error contracts, and tests.
4. Remove the Supabase client, dependency, environment documentation, database/seed/update scripts, obsolete Prisma schema/migrations/seed, and database-backed admin/auth/API implementation.
5. Return a deliberate 404/redirect for any retired `/admin` surface and remove it from navigation/robots assumptions. Do not ship a broken login.
6. Ensure a clean install and production build require no Supabase variables and make zero Supabase network calls.

### Phase 3 — Finish incomplete work and repair developer workflow

1. Resolve placeholder/incomplete code by either implementing it in the static architecture or removing the obsolete surface.
2. Update README to actual Node/npm/Next setup, environment variables, content authoring, image workflow, localization workflow, tests, build, and deploy.
3. Align Next/ESLint packages and config so `npm run lint` completes successfully without bypass flags.
4. Make a deliberate TypeScript policy for tests and production; `npm run typecheck` should be explicit and green.
5. Add tests for local product/article enumeration, locale fallback rules, all referenced assets, sitemap coverage, and no forbidden Supabase imports/dependency.

### Phase 4 — Public UI/UX improvements

1. Keep the current premium industrial visual language, logo, palette, and content authority; improve consistency rather than redesigning arbitrarily.
2. Audit at 360, 390, 768, 1024, 1280, and 1440 widths.
3. Ensure fixed header offsets do not hide anchors/headings and mobile menus cannot trap page scrolling.
4. Add complete keyboard interaction to dropdowns and dialogs (Escape, focus return, visible focus, outside click without race conditions).
5. Ensure all interactive targets are at least about 44 px on touch layouts.
6. Normalize section spacing, reading width, heading wrapping, CTA hierarchy, card image loading, empty/error states, form feedback, and reduced-motion behavior.
7. Localize every UI string visible on non-English routes.
8. Keep Core Web Vitals in mind: local optimized images, explicit sizes, minimal `priority`, no layout shift, and avoid unnecessary client components.

### Phase 5 — Two new eight-language articles

Do not duplicate the current purchasing, basic COA-reading, extraction-method, Novel Food, generic isolate, packaging/storage, private label, or cannabinoid-comparison articles.

Recommended distinct topics for research and final selection:

1. **CBD raw-material change control for B2B formulation teams** — a practical protocol for comparing supplier lots, defining critical quality attributes, pilot validation, retained samples, deviation/OOS handling, and approval records.
2. **CBD isolate reference standards vs commercial bulk material** — identity/purity terminology, method suitability, calibration/reference materials, measurement uncertainty, and how buyers should interpret laboratory scope without treating a bulk COA as a certified reference material.

For each topic:

- validate intent and non-duplication before drafting;
- create one canonical slug shared across locales;
- produce complete `en/de/fr/es/it/pt/ja/fi` title, excerpt, body, CTA, FAQ (visible content only; do not target deprecated FAQ rich results), metadata, and internal links;
- cite authoritative primary sources in the visible article, distinguish evidence from practical recommendations, and avoid legal/medical advice;
- use a unique, repository-local hero image with descriptive filename, dimensions, alt text, and provenance record;
- add contextual internal links to products, quality assurance, process, inquiry, and complementary articles without keyword-stuffed anchors;
- include actual ISO dates in frontmatter, not ambiguous strings such as “May 2026”.

### Phase 6 — SEO remediation

1. Generate canonical, indexable sitemap URLs exclusively from local data.
2. Use real content modification dates; omit unreliable `lastModified` rather than setting every route to today. Remove meaningless priority/change-frequency logic if it adds no consumer value.
3. Emit `WebSite` site-name structured data only on the domain homepage. Keep Organization data consistent and factual.
4. Emit page-specific Article/Product/Breadcrumb structured data only when visible content supplies the fields. Do not claim prices, ratings, offers, availability, or certifications not shown and supported.
5. Consolidate or clearly differentiate overlapping COA, regulation, and extraction articles. Use redirects when removing a duplicate URL.
6. Fix duplicate/generic localized titles and descriptions.
7. Only advertise hreflang variants that exist and contain appropriately localized main content. Each cluster must be self-referencing and reciprocal with one x-default.
8. Set the document `lang` to the current route locale, not globally `en` for every URL.
9. Repair orphaned pages with contextual internal links or intentionally noindex/remove them.
10. Validate canonical, title, description, H1, image alt, 404 status, breadcrumbs, JSON-LD, internal links, robots, sitemap, and language alternates on representative and edge routes.

## Acceptance gates

All must pass before handoff:

1. `npm ci`
2. `npm test`
3. explicit typecheck command
4. `npm run lint`
5. `npm run build` with no Supabase environment variables
6. repository search proves no Supabase package/import/env/reference remains except intentional migration documentation, if any
7. build/static generation covers all two product canonical slugs × eight locales and every published article × every published locale
8. asset audit: every site-owned image reference resolves locally; no article hero uses a remote URL
9. HTTP route audit: representative locale home/list/detail/legal/form routes return the intended status; unknown article/product slugs return real 404
10. rendered-browser audit at desktop and mobile widths with screenshots and keyboard checks
11. Vibio SEO re-crawl after local production build; compare against `seo-baseline-http.json`
12. structured data validation and DOM checks for homepage, product, article, localized page, and 404
13. no broken internal links and no unintentional orphaned canonical pages
14. two new topics each have eight genuinely translated versions, unique local hero asset, primary-source citations, metadata, and internal links
15. README accurately documents the static content and localization workflow

## Codex review policy

Codex will inspect the complete diff, rerun every gate, sample all locale families, compare the rendered DOM and screenshots, rerun Vibio SEO inspection, and reject claims unsupported by source/runtime evidence. Passing compilation alone is not acceptance.
