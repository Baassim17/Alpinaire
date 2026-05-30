# Alpinaire Design Tokens

This document details the extracted design tokens of the Alpinaire website. These tokens establish a premium, minimalistic luxury watch brand aesthetic: ultra-sharp corners, strong typography pairings, absolute monochrome contrast, and fluid micro-animations.

---

## 1. Color Palette

Alpinaire uses a strict, stark monochrome palette. The design relies entirely on light and dark sections to create a premium editorial feel.

| Token | CSS/Computed Value | HEX Equivalent | Usage / Application |
| :--- | :--- | :--- | :--- |
| **bg-primary** | `rgb(255, 255, 255)` | `#FFFFFF` | Default page background, light sections (Intro, Work, Card backings) |
| **bg-dark** | `rgb(0, 0, 0)` | `#000000` | Full page/Hero container background, dark sections, overlay menus, cookies, footer |
| **bg-overlay** | `rgba(0, 0, 0, 0.75)` | `#000000BF` | Fullscreen background overlay (e.g. Legal Notice backdrop) |
| **bg-placeholder** | `rgb(114, 114, 114)` | `#727272` | Fallback background for looping media and video frames |
| **text-primary** | `rgb(0, 0, 0)` | `#000000` | Headings, paragraph body, and button labels on light sections |
| **text-inverse** | `rgb(255, 255, 255)` | `#FFFFFF` | Headings, baseline strong tags, menu items, and links in dark sections |
| **text-muted** | `rgb(114, 114, 114)` | `#727272` | Footer disclaimers, minor copyright info, legal text paragraphs |
| **border-light** | `rgb(255, 255, 255)` | `#FFFFFF` | Thin sharp borders for buttons/menu elements on dark sections |
| **border-dark** | `rgb(0, 0, 0)` | `#000000` | Thin sharp borders for buttons/links on light sections |

---

## 2. Typography

The typography relies on two distinct custom loaded typefaces. 

### A. Font Families

*   **`Zodiak, serif`** (High-end, elegant editorial serif loaded locally from `/Zodiak-Light-B3IFu5EZ.woff2`). Used exclusively for H1, H2, and baseline strong elements.
*   **`UCity, sans-serif`** (Clean, geometric, premium minimalist sans-serif loaded locally from `/UCityProTrial-Light-Bec3XHL8.woff2` and `/UCityProTrial-Regular-Dw9vie3S.woff2`). Used for body paragraphs, buttons, navigation, and disclaimers.

### B. Font Weights
*   **Light / Extra Light:** `300` (Used for Zodiak serif headings and UCity thin paragraphs)
*   **Regular:** `400` (Used for UCity standard elements like buttons, nav labels, body default)

### C. Typography Scale

| Hierarchy | Font Family | Size (px) | Line Height (px) | Weight | Alignment / Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero Main)** | Zodiak, serif | `67.5px` | `67.5px` | `300` | Capitalized / Normal |
| **Hero Baseline** | Zodiak, serif | `30px` | `33.333px` | `300` | UPPERCASE (`GENEVA `) |
| **H2 (Section Heading)** | Zodiak, serif | `67.5px` | `67.5px` | `300` | Capitalized / Normal |
| **H2 (Muted Section Heading)** | Zodiak, serif | `45px` | `52.497px` | `300` | Capitalized / Normal |
| **H3 (Project Title)** | UCity, sans-serif | `22.5px` | `27px` | `400` | Normal |
| **Body (Default)** | UCity, sans-serif | `30px` | `34.5px` | `400` | Normal |
| **Body (Intro block)** | UCity, sans-serif | `26.25px` | `44.9977px` | `300` | Normal |
| **Navigation Link (Primary)** | Zodiak, serif | `73.125px` | `78.7483px` | `300` | Capitalized / Normal |
| **Navigation Link (Secondary)**| UCity, sans-serif | `22.5px` | `27px` | `400` | Normal |
| **UI Button (Muted/Minor)** | UCity, sans-serif | `18.75px` | `22.5px` | `400` | Normal |
| **Legal Notice / Disclaimers** | UCity, sans-serif | `18.75px` | `26.25px` | `300` / `400` | Normal |

---

## 3. Spacing, Grid, and Layout

Alpinaire employs a strict alignment grid with generous vertical paddings to evoke luxury space.

*   **Vertical Padding (Sections):** Typical heights or top paddings are structured as a percentage of viewport height or absolute offsets (e.g. Hero top padding of `611.32px` to push baseline watch elements into viewport center, and generous whitespace between columns).
*   **Borders:** `1px solid` is applied for interactive elements (such as `button` overlays, and outline selectors).
*   **Border Radius:** Strict **`0px`** (sharp corners). There are no pill buttons, rounded cards, or soft elements anywhere on the page, matching the high-end industrial design of luxury watch metals.

---

## 4. Breakpoints

Layout shifts are mobile-first but meticulously aligned to the captured target sizes:

*   **Desktop:** `1440px` (Main rendering and grid layouts)
*   **Tablet:** `768px` (Flex scaling down, gaps shrinking, navigation switching to hamburger)
*   **Mobile:** `390px` / `375px` (Vertical stacking, full bleed media blocks, smaller header CTAs)

---

## 5. Visual Styling & Asset Override Guidelines

1.  **PNG Brand Logo:** The brand logo is overridden in CSS to display a PNG asset (`/images/Alpinaire logo.png` on standard/dark sections, or `/images/Alpinaire logo_blk.png` on light components if needed).
    *   Hides nested inline SVG nodes (`display: none !important`).
    *   Uses a pseudo `::before` selector to display the PNG with `background-size: contain; background-repeat: no-repeat;`.
2.  **Hero Static Fallback Background:** The dynamic hero watch picture `ALTER_ROLEX_2_f67d689f05.jpg` is set to `opacity: 0 !important`. Instead, a static background image `/images/Hero.png?v=alpinaire-hero-2` is loaded directly onto the hero root and backdrop containers.
3.  **Legal Notice Modal Removal:** The legal notice modal `.LegalNotice-module__root` has been completely disabled and hidden from the layout and visual flow (`display: none !important; visibility: hidden !important; pointer-events: none !important;`).
4.  **Footer Legal Link Stripping:** The list of legal buttons `.LegalInfos-module__list` is set to `display: none !important;`, hiding the bottom link items from the footer completely.
