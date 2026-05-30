# Header Component Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Screenshot:** `docs/design-references/header.png`
- **Interaction model:** Static layout with click-driven menu toggle and hover-driven CTA underline effects.

---

## DOM Structure

```html
<header class="Header-module__root Header-module__root_large">
  <div class="Header-module__wrapper">
    <!-- Menu Toggle Button -->
    <button class="MenuButton-module__root MenuButton-module__root_dark Header-module__button Header-module__button_menu" aria-label="Open menu" aria-controls="menu">
      <div class="MenuButton-module__wrapper">
        <span class="MenuButton-module__label MenuButton-module__label_open">Menu</span>
        <span class="MenuButton-module__label MenuButton-module__label_close">Close</span>
      </div>
    </button>
    
    <!-- Centered Brand Logo Button (Uses PNG pseudo-element override) -->
    <button class="LogoHeader-module__root LogoHeader-module__root_dark Header-module__logo" aria-label="Alpinaire logo" aria-disabled="true">
      <div class="Logo-module__root">
        <!-- SVG is display: none !important -->
        <svg width="143" height="36" viewBox="0 0 143 36" fill="currentColor">
          <!-- Hidden SVG paths -->
        </svg>
      </div>
    </button>
    
    <!-- Right Underline CTA Link -->
    <a class="Link MainButton-module__root Header-module__button Header-module__button_cta MainButton-module__root_details-1 MainButton-module__root_white MainButton-module__root_underline" aria-label="Your project" href="/contact">
      Your project
    </a>
  </div>
</header>
```

---

## Computed Styles (Exact Computed Values)

### A. Root Container (`Header-module__root`)
*   `position`: `fixed`
*   `top`: `0px`
*   `left`: `0px`
*   `width`: `100%`
*   `zIndex`: `10`
*   `backgroundColor`: `rgba(0, 0, 0, 0)` (Transparent, overlays Hero/Content sections)

### B. Wrapper Element (`Header-module__wrapper`)
*   `display`: `flex`
*   `justifyContent`: `space-between`
*   `alignItems`: `center`
*   `padding`: `24px 40px` (Desktop spacing padding)

### C. Menu Button (`MenuButton-module__root`)
*   `display`: `block`
*   `backgroundColor`: `rgba(0, 0, 0, 0)`
*   `border`: `1px solid rgb(255, 255, 255)`
*   `borderRadius`: `0px` (Strict sharp corners)
*   `padding`: `10px 20px`
*   `color`: `rgb(255, 255, 255)`
*   `fontFamily`: `UCity, sans-serif`
*   `fontSize`: `22.5px`
*   `lineHeight`: `27px`

### D. Center Brand Logo Override (`Logo-module__root`)
*   Inner SVG element: `display: none !important;`
*   Pseudo `::before` element:
    *   `content`: `""`
    *   `display`: `block`
    *   `width`: `100%`
    *   `height`: `100%`
    *   `backgroundImage`: `url("/images/Alpinaire%20logo.png")`
    *   `backgroundPosition`: `center`
    *   `backgroundRepeat`: `no-repeat`
    *   `backgroundSize`: `contain`
*   **Dimensions Scale:**
    *   Standard Header: `.Header-module__logo__Yh6Bo .Logo-module__root__FNsq2 { width: 94rem !important; height: 94rem !important; margin-inline: auto; }`
        *   Standard Header (Desktop/Landscape): `width: 142rem !important; height: 142rem !important;`
    *   Large Header: `.Header-module__root_large__n2msR .Header-module__logo__Yh6Bo .Logo-module__root__FNsq2 { aspect-ratio: 1431 / 198; width: min(720rem, 88vw) !important; height: auto !important; }`
        *   Large Header (Desktop/Landscape): `width: min(1320rem, 72vw) !important; height: auto !important;`

### E. Right CTA Link (`Header-module__button_cta`)
*   `color`: `rgb(255, 255, 255)`
*   `fontSize`: `22.5px`
*   `lineHeight`: `27px`
*   `fontFamily`: `UCity, sans-serif`
*   `textDecoration`: `none`

---

## States & Behaviors

### 1. Label Swap Transition (Menu <-> Close)
*   **Trigger:** Click menu button.
*   **Behavior:** Open label slide-translates up and fades out, while Close label slides in from below.
*   **Transition CSS:** `transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;`

### 2. Underline Hover Effect on CTA
*   **Behavior:** On hover, a bottom border-underline transitions in from left to right.
*   **Transition CSS:** `transition: width 0.4s ease;`

---

## Responsive Behavior

*   **Desktop (1440px):** Large logo container (`width: min(1320rem, 72vw)` for large header), padding `24px 40px`.
*   **Tablet (768px):** Spacing padding `20px 24px`.
*   **Mobile (390px):** Logo container sizes down (`width: min(720rem, 88vw)` for large header, standard logo at `94rem`).
