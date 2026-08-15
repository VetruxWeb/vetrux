# Vetrux CBD website

The public Vetrux B2B website is built with Next.js 16, React 19, TypeScript, Tailwind CSS, and local Markdown content. Products and articles are stored in the repository and generated without Supabase or a database-backed CMS.

## Requirements

- Node.js 24 LTS (see `.nvmrc` and `.node-version`)
- npm 11 or the npm version bundled with Node 24

## Local setup

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Next.js uses `http://localhost:3000` by default. Use `npm run dev -- --port 3080` only when you intentionally want port 3080.

The site renders without service credentials. Inquiry submissions require the Turnstile and SMTP variables described below.

## Quality checks

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

`npm run build` must succeed without Supabase, database, or authentication variables. The production server defaults to port 3000; pass `-- -p <port>` to `npm start` to choose another port.

## Content architecture

### Articles

Article files live in `src/content/articles`.

- English: `<slug>.md`
- Localized: `<slug>.<locale>.md`
- Supported locales: `en`, `de`, `fr`, `es`, `it`, `pt`, `ja`, `fi`

Required frontmatter:

```yaml
---
title: "Article title"
slug: article-slug
category: Quality
date: "2026-08-14"
readTime: 10 min
excerpt: "Search and listing description."
image: "/images/articles/article-slug.webp"
imageAlt: "Meaningful description of the hero image"
---
```

Only locale files that actually exist are published and advertised in `hreflang`. Do not copy English text into a localized file as a placeholder. Article images are local assets under `public/images/articles`; `PROVENANCE.md` records how those assets were produced.

`npm run dev` and `npm run build` regenerate `generated-articles.json` from the Markdown files. Commit that generated snapshot with content changes so type checking and other read-only checks see the same deterministic registry.

### Products

The two public product records and all localized copy live in `src/content/pages/products.data.ts`. Product list and detail pages are generated for every supported locale. Update that file and the related page strings together when changing a product.

### Public pages and SEO

- Route wrappers: `app/`
- Shared localized page content: `src/content/pages/`
- Metadata and JSON-LD: `src/lib/seo.ts`
- Sitemap: `app/sitemap.ts`
- Locale definitions: `src/i18n/locales.ts`

Keep canonical URLs, `hreflang`, visible content, and JSON-LD in the same locale. Sitemap `lastModified` values come from complete ISO dates in article frontmatter; the generator does not substitute the current date.

## Inquiry configuration

Copy `.env.example` to `.env.local` and provide real values locally or in the deployment environment. Never commit credentials.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | For forms | Cloudflare Turnstile site key exposed to the browser |
| `TURNSTILE_SECRET_KEY` | For forms | Server-side Turnstile verification key |
| `SMTP_USER` | For forms | SMTP login |
| `SMTP_PASS` | For forms | SMTP password or app password |
| `INQUIRY_MAIL_PROVIDER` | Optional | `aliyun` (default), `gmail`, or `custom` |
| `SMTP_HOST` | Optional | Provider SMTP host |
| `SMTP_PORT` | Optional | Provider SMTP port; default 465 |
| `SMTP_SECURE` | Optional | TLS mode; default `true` |
| `INQUIRY_MAIL_FROM` | Optional | Envelope/from mailbox |
| `INQUIRY_MAIL_TO` | Optional | Lead destination mailbox |
| `INQUIRY_ALLOWED_ORIGINS` | Optional | Comma-separated additional origins |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site origin; production default is `https://www.vetrux.tech` |

The three public endpoints are:

- `POST /api/inquiry`
- `POST /api/quote-inquiry`
- `POST /api/document-request`

They validate fields, check request origin, use a honeypot and elapsed-time guard, verify Turnstile, apply an in-memory rate limit, escape user-controlled HTML, and send mail through SMTP. The in-memory limiter is per running server instance; use a shared rate-limit store before relying on it as a distributed control across many serverless instances.

## Retired architecture

The Supabase/Prisma/NextAuth admin CMS has been removed. `/admin` deliberately returns the site 404 page. Do not restore database migrations, seed credentials, service-role keys, admin APIs, or authentication packages unless the project intentionally reintroduces a reviewed CMS architecture.

## Deployment

The repository is configured for Vercel in `vercel.json`. Set the form environment variables in the deployment project, deploy, then verify:

1. canonical and `hreflang` tags on one English and one localized page;
2. `/sitemap.xml` and `/robots.txt`;
3. a successful Turnstile-protected test inquiry;
4. mailbox delivery and reply-to behavior;
5. the production CSP in the browser console.
