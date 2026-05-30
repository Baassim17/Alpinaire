# Alpinaire Technical Stack Analysis

This document analyzes the technical structure, frameworks, libraries, and content strategies utilized by the live Alpinaire website, mapping them to our premium modern Next.js 16 codebase equivalent.

---

## 1. Original Website Stack Detection

Based on the DOM snapshot, script bundles, and page metadata, the live site is architected as follows:

*   **Core Architecture:** Single Page Application (SPA) compiled with Vite, incorporating server-side rendering (SSR) or static site generation (SSG) hydration.
*   **CMS / API Backend:** **Strapi CMS** (indicated by the asset pathways `/uploads/` and props injection schemas `__SSR_STATIC_PROPS__.props.data`).
    *   API Endpoint: `https://api.alpinaire.com/`
    *   Dynamic Endpoint: `https://api.alpinaire.com/api/random` (called on mount to refresh the projects grid).
*   **Styling Strategy:** **CSS Modules** (evidenced by hashed class name modules like `App-module__root__JTuhI` and `Header-module__root__inCDV`).
*   **Scroll Engine:** **Lenis** (by Studio Freight), verified by class tags injected onto the main HTML container: `lenis lenis-stopped` or `lenis lenis-smooth`.
*   **Asset Hosting:** All custom images, responsive image variants (srcset thumbnail, small, medium, large, xlarge), and autoplay mp4 clips are stored under the Strapi `/uploads/` bucket.

---

## 2. Our Chosen Equivalent Technical Stack

To rebuild Alpinaire with maximum fidelity, performance, and clean type-safety, we will map their stack to a modern modern tech stack:

| Core Requirement | Live Site Implementation | Our Rebuild Equivalent |
| :--- | :--- | :--- |
| **Framework** | React hydrated SPA (Vite) | **Next.js 16 (App Router + React 19)** |
| **Programming Language** | JavaScript/ES6 | **TypeScript (Strict Mode, zero `any`)** |
| **Styling** | CSS Modules | **Tailwind CSS v4 + HSL/OKLCH Design Variables** |
| **UI Primitive Library** | Custom CSS Blocks | **shadcn/ui (Radix Primitives + `cn()` utility)** |
| **Smooth Scrolling** | Lenis JS library | **`@studio-freight/react-lenis` integration** |
| **Typography** | Local `@font-face` loads | **`next/font/local`** wrapping woff2 files |
| **CMS Data Fetching** | Static Props Injection + REST API | **Next.js Server Components (SSR/ISR)** with client fallback |
| **Animation Library** | Custom transition CSS / GSAP | **Framer Motion + CSS transitions / Keyframes** |

---

## 3. Detailed Component Mappings and Integrations

### A. Font Integration (`next/font/local`)
The woff2 assets referenced in the live markup will be placed in `public/fonts/` and integrated into Next.js:
*   `public/fonts/UCityProTrial-Light.woff2` (Weight `300`)
*   `public/fonts/UCityProTrial-Regular.woff2` (Weight `400`)
*   `public/fonts/Zodiak-Light.woff2` (Weight `300`)

```typescript
// Example configuration in src/app/layout.tsx
import localFont from 'next/font/local';

const zodiak = localFont({
  src: '../../public/fonts/Zodiak-Light.woff2',
  variable: '--font-zodiak',
  weight: '300',
});

const ucity = localFont({
  src: [
    { path: '../../public/fonts/UCityProTrial-Light.woff2', weight: '300' },
    { path: '../../public/fonts/UCityProTrial-Regular.woff2', weight: '400' },
  ],
  variable: '--font-ucity',
});
```

### B. Tailwind CSS v4 Styling Configuration
In our `globals.css` base design system, we will register custom fonts and colors matching the live site:

```css
@theme {
  --font-serif: var(--font-zodiak), serif;
  --font-sans: var(--font-ucity), sans-serif;
  
  --color-brand-black: #000000;
  --color-brand-white: #ffffff;
  --color-brand-gray: #727272;
}
```

### C. Data Integration Strategy
To maintain the dynamic feel of the live projects block:
1.  **Initial Render:** Server-side render (SSR) the three default projects captured in `dom-and-assets.json` (No. 054, No. 318, No. 042).
2.  **Client Hydration:** Hook into `api.alpinaire.com/api/random` or mock locally. If the API endpoint is down, fallback seamlessly to static props without throwing component errors.
