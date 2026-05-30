# ProjectCard Component Specification

## Overview
- **Target file:** `src/components/ProjectCard.tsx`
- **Screenshot:** `docs/design-references/project-card.png`
- **Interaction model:** Hover-driven title slide-up, card outline transition, and frame inner zoom effect.

---

## DOM Structure

```html
<a class="Link ProjectCard-module__root" href="/projects/project-016">
  <!-- Interactive Header (Hidden Clip Mask) -->
  <h3 class="ProjectCard-module__title">
    <div class="lineParent" style="display: block; text-align: start; position: relative; overflow: hidden;">
      <div class="lineChild" style="display: block; transform: translate(0%, 120%); opacity: 0;">
        No. 054
      </div>
    </div>
  </h3>
  
  <div class="ProjectCard-module__subTitle"></div>
  
  <!-- Outer Media Framing -->
  <div class="ProjectCard-module__media" style="overflow: hidden;">
    <picture class="ProjectCard-module__mediaWrapper ProjectCard-module__mediaWrapper_landscape" style="will-change: transform; transform: translate3d(0px, -10%, 0px) scale(1.15);">
      <img class="ProjectCard-module__mediaImage" src="https://api.alpinaire.com/uploads/vignette_Pasha_noir_petit_74f9f299b9.jpg" alt="Alpinaire" draggable="false">
    </picture>
  </div>
</a>
```

---

## Computed Styles (Exact Computed Values)

### A. Root Anchor (`ProjectCard-module__root`)
*   `display`: `block`
*   `textDecoration`: `none`
*   `cursor`: `pointer`
*   `color`: `rgb(0, 0, 0)`

### B. Title (`ProjectCard-module__title`)
*   `fontFamily`: `UCity, sans-serif`
*   `fontSize`: `22.5px`
*   `lineHeight`: `27px`
*   `fontWeight`: `400`
*   `marginBottom`: `12px`

### C. Media Wrap Parent (`ProjectCard-module__media`)
*   `position`: `relative`
*   `width`: `100%`
*   `overflow`: `hidden`
*   `backgroundColor`: `rgb(0, 0, 0)`

### D. Image Frame (`ProjectCard-module__mediaWrapper`)
*   `display`: `block`
*   `width`: `100%`
*   `transition`: `transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)`
*   **Aspect Ratio Configurations:**
    *   `ProjectCard-module__mediaWrapper_landscape`: `aspect-ratio: 16/10` or raw landscape proportions.
    *   `ProjectCard-module__mediaWrapper_portrait`: `aspect-ratio: 3/4` or raw portrait proportions.

---

## States & Behaviors

### 1. Title Slide Mask Reveal
*   **Initial State (Normal):** The title element `.lineChild` is offset down below the clipping viewport: `transform: translate(0%, 120%); opacity: 0;`
*   **Hover State:** The card hover triggers: `transform: translate(0%, 0%); opacity: 1;`
*   **Transition Timing:** `transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;`

### 2. Media Zoom
*   **Initial State (Normal):** The inner watch graphic is slightly zoomed to accommodate parallax movements: `transform: scale(1.15) translate3d(0px, -10%, 0px);`
*   **Hover State:** The watch graphic zooms further inside its boundary: `transform: scale(1.23) translate3d(0px, -10%, 0px);`
*   **Transition Timing:** `transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);`

---

## Responsive Behavior

*   **Desktop (1440px):** Spaced in two-column grid rows on the parent list.
*   **Tablet (768px):** Font size remains standard, gaps compress slightly.
*   **Mobile (390px):** Cards stack vertically in a single full-width column, aspect ratio constraints adapt fluidly.
