# HomeKeywords Component Specification

## Overview
- **Target file:** `src/components/HomeKeywords.tsx`
- **Screenshot:** `docs/design-references/keywords.png`
- **Interaction model:** Interactive row accordion (Swiss quality, Innovation, Tradition). Hovering or clicking a row expands its height/width to reveal a background looping video segment.

---

## DOM Structure

```html
<section class="HomeKeywords-module__root">
  <div class="HomeKeywords-module__wrapper">
    <ul class="HomeKeywords-module__list">
      <!-- Active Keyword Row -->
      <li class="HomeKeywords-module__item HomeKeywords-module__item_active">
        <h2 class="HomeKeywords-module__title">Swiss quality</h2>
        <div class="HomeKeywords-module__media">
          <video class="VideoLoop-module__root HomeKeywords-module__mediaImage" src="https://api.alpinaire.com/uploads/HOMEPAGE_SWISS_QUALITY_c4bc2d470f.mp4" autoplay loop muted playsinline disablepictureinpicture preload="auto"></video>
        </div>
      </li>
      
      <!-- Inactive Keyword Row -->
      <li class="HomeKeywords-module__item HomeKeywords-module__item_inactive">
        <h2 class="HomeKeywords-module__title">Innovation</h2>
        <div class="HomeKeywords-module__media">
          <video class="VideoLoop-module__root HomeKeywords-module__mediaImage" src="https://api.alpinaire.com/uploads/HOMEPAGE_INNOVATION_3c5f31c5f9.mp4" autoplay loop muted playsinline disablepictureinpicture preload="auto"></video>
        </div>
      </li>
      
      <!-- Inactive Keyword Row -->
      <li class="HomeKeywords-module__item HomeKeywords-module__item_inactive">
        <h2 class="HomeKeywords-module__title">Tradition</h2>
        <div class="HomeKeywords-module__media">
          <video class="VideoLoop-module__root HomeKeywords-module__mediaImage" src="https://api.alpinaire.com/uploads/HOMEPAGE_TRADITION_f946fc06ac.mp4" autoplay loop muted playsinline disablepictureinpicture preload="auto"></video>
        </div>
      </li>
    </ul>
  </div>
</section>
```

---

## Computed Styles (Exact Computed Values)

### A. Root Container (`HomeKeywords-module__root`)
*   `position`: `relative`
*   `width`: `100%`
*   `backgroundColor`: `rgb(255, 255, 255)` (White backing)
*   `padding`: `120px 40px`

### B. List Item Row (`HomeKeywords-module__item`)
*   `position`: `relative`
*   `display`: `flex`
*   `alignItems`: `center`
*   `justifyContent`: `space-between`
*   `borderBottom`: `1px solid rgb(0, 0, 0)`
*   `height`: `150px`
*   `cursor`: `pointer`
*   `overflow`: `hidden`

### C. Row Title (`HomeKeywords-module__title`)
*   `fontFamily`: `Zodiak, serif`
*   `fontSize`: `67.5px`
*   `lineHeight`: `67.5px`
*   `fontWeight`: `300`
*   `color`: `rgb(0, 0, 0)`

### D. Video Wrapper Frame (`HomeKeywords-module__media`)
*   `position`: `absolute`
*   `right`: `40px`
*   `width`: `300px` (Expanded width on active)
*   `height`: `100px`
*   `backgroundColor`: `rgb(114, 114, 114)` (Muted fallback backing)
*   `overflow`: `hidden`
*   `transition`: `width 0.5s ease, opacity 0.5s ease`

---

## States & Behaviors

### 1. Active vs Inactive Row Transition
*   **Trigger:** Click row (mobile/tablet) or Hover row (desktop).
*   **Active Row Styles (`HomeKeywords-module__item_active`):**
    *   Title color: stark black.
    *   Media frame: `width: 400px; opacity: 1; pointer-events: auto;`
*   **Inactive Row Styles (`HomeKeywords-module__item_inactive`):**
    *   Title color: slightly faded black or gray.
    *   Media frame: `width: 0px; opacity: 0; pointer-events: none;`
*   **CSS Timing:** `transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;`

### 2. Video Control
*   Videos are loaded with `autoplay`, `loop`, `muted`, `playsinline` attributes to guarantee background loop playback without user authorization constraints.

---

## Responsive Behavior

*   **Desktop (1440px):** Rows are `150px` tall, video reveals expand to `400px` wide.
*   **Tablet (768px):** Font size scales to `45px`, row height `120px`, video reveals expand to `250px`.
*   **Mobile (390px):** Vertical stacking or rows shrink. Font size scales to `32px`, video reveals scale down to fit small phone sizes without clipping text.
