# Vertrux — B2B CBD Extract Website

Premium B2B frontend for Yunnan Vertrux, a pharmaceutical-grade CBD extract manufacturer. Built as a static marketing site with React, TypeScript, Vite, Tailwind CSS, and GSAP animations. Optimized for Vercel deployment.

---

## Overview

This project is a brand and lead-generation website focused on:
- presenting Yunnan Vertrux's extraction and cultivation capabilities
- showcasing flagship CBD isolate product information
- publishing industry insight articles from local Markdown content
- capturing wholesale / partnership inquiries through a reusable inquiry form UI

Note: the current inquiry form is a frontend-only submission flow and does not yet post to a backend or email service.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v7 |
| Animation | GSAP + ScrollTrigger + `@gsap/react` |
| Content Rendering | React Markdown + `remark-gfm` |
| Icons | Lucide React |
| Font | Manrope |
| Deployment | Vercel |

---

## Getting Started

```bash
npm install
npm run dev
```

Open the local dev server URL shown by Vite.

### Available Scripts

```bash
npm run dev      # start development server
npm run build    # type-check and build production bundle
npm run lint     # run ESLint
npm run preview  # preview the production build locally
```

---

## Routes

| Path | Page | Purpose |
|------|------|---------|
| `/` | HomePage | Brand hero, trust signals, facility overview |
| `/products/cbd-isolate` | ProductPage | Product detail page for CBD isolate |
| `/equipment` | EquipmentPage | Extraction equipment and technical showcase |
| `/planting` | PlantingPage | Cultivation base, growing zones, traceability |
| `/gallery` | GalleryPage | Campus / facility gallery |
| `/insights` | InsightsPage | Article listing and featured insight |
| `/insights/:slug` | ArticlePage | Markdown-rendered article detail page |
| `/inquiry` | InquiryPage | B2B inquiry / partnership form |
| `*` | NotFound | 404 fallback |

---

## Project Structure

```text
vertrux/
├── public/
│   ├── images/
│   │   ├── equipment/
│   │   ├── gallery/
│   │   ├── hero/
│   │   ├── planting/
│   │   └── products/
│   └── logo.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── content/
│   │   └── articles/
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── README.md
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── vercel.json
```

### Component Organization

- `atoms/`: small reusable UI primitives such as buttons, badges, and labels
- `molecules/`: composed UI blocks such as `InquiryForm`, `SpecRow`, and `StatCard`
- `organisms/`: full layout sections such as `Navbar`, `Footer`, and `Layout`
- `pages/`: route-level page components

---

## Content Model

Articles are stored as local Markdown files in `src/content/articles/`.

`src/content/articles/index.ts`:
- imports Markdown files with Vite's `?raw` loader
- parses frontmatter metadata
- builds the article list used by `InsightsPage`
- maps raw article content by slug for `ArticlePage`

### To add a new article

1. Create a new Markdown file in `src/content/articles/`
2. Add frontmatter fields such as:
   - `slug`
   - `category`
   - `title`
   - `excerpt`
   - `date`
   - `readTime`
   - `image`
3. Import the file in `src/content/articles/index.ts`
4. Add it to the `rawFiles` array in the desired display order

---

## Design System Notes

The UI uses a custom Tailwind token setup defined in `tailwind.config.js`.

Highlights:
- deep green primary brand palette
- layered surface colors for soft hierarchy
- Manrope typography
- compact radius values for a sharper industrial feel
- minimal bottom-border form fields
- animated section reveals with GSAP

Global styles and shared utility classes live in `src/index.css`.

---

## Deployment

### Vercel

```bash
vercel deploy
```

Client-side routing is supported by `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

No environment variables are currently required for the static frontend.

---

## Current Status

Verified locally:
- `npm run build` passes
- `npm run lint` passes

Known follow-up opportunities:
- connect `InquiryForm` to a real backend, email service, or CRM
- replace remaining placeholder product imagery if needed
- introduce route-level code splitting to reduce the main JS bundle size
- move hard-coded page data into structured content/config if content updates become frequent
