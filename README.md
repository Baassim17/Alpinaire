# Alpinaire Website

A customized Alpinaire watchmaking website running on Next.js. The app serves a restored static front-end bundle, local API JSON, and local media assets so the site works without depending on the original remote backend.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind/PostCSS tooling
- Static Alpinaire assets in `public/`

## Project Structure

```text
src/
  app/
    route.ts              # Serves the homepage HTML
    [...path]/route.ts    # Serves inner website pages
    api/[...path]/route.ts # Serves local API JSON
  lib/
    alpinaire-page.ts     # Maps routes to local page data

public/
  alpinaire/              # HTML shell and local API JSON
  images/                 # Logo and hero images
  videos/                 # Local video assets
  uploads/                # Restored media used by pages/projects
  index-*.js/css          # Imported site bundle and styles
```

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run start
```

The local development URL is usually:

```text
http://localhost:3000
```

## Notes

- The website uses local JSON under `public/alpinaire/api/` for services, projects, legal pages, and other content.
- Core branding assets are in `public/images/`, including the Alpinaire logo and hero image.
- Homepage section videos are in `public/videos/`.
- The imported static bundle is intentionally kept in `public/`; edits to layout and animation overrides are currently applied through the public CSS/JS assets.

## Verification

Before handing off changes, run:

```bash
npm run typecheck
npm run build
```

The production build may show an existing Turbopack file-tracing warning from the dynamic local API route, but it should still complete successfully.
