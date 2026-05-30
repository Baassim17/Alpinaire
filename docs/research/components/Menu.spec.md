# Menu Component Specification

## Overview
- **Target file:** `src/components/Menu.tsx`
- **Screenshot:** `docs/design-references/menu-overlay.png`
- **Interaction model:** Click-driven full-screen open/close overlay with micro-stagger text slide entrance.

---

## DOM Structure

```html
<nav class="Menu-module__root" id="menu" aria-expanded="false" data-lenis-prevent="true">
  <!-- Solid Black Background Overlay -->
  <div class="Menu-module__background" style="opacity: 0;"></div>
  
  <div class="Menu-module__wrapper">
    <!-- Primary Navigation Links (Zodiak serif) -->
    <ul class="MenuNavigation-module__root Menu-module__primary">
      <li class="MenuNavigation-module__item">
        <div class="MenuNavigation-module__item_current" style="transform: translate(0%, 140%); opacity: 0;">
          <a class="Link MenuNavigation-module__link MenuNavigation-module__link_current active" href="/">Home</a>
        </div>
      </li>
      <li class="MenuNavigation-module__item">
        <div style="transform: translate(0%, 140%); opacity: 0;">
          <a class="Link MenuNavigation-module__link" href="/services">Services</a>
        </div>
      </li>
      <li class="MenuNavigation-module__item">
        <div style="transform: translate(0%, 140%); opacity: 0;">
          <a class="Link MenuNavigation-module__link" href="/projects">Projects</a>
        </div>
      </li>
      <li class="MenuNavigation-module__item">
        <div style="transform: translate(0%, 140%); opacity: 0;">
          <a class="Link MenuNavigation-module__link" href="/warranties">Warranties</a>
        </div>
      </li>
    </ul>
    
    <!-- Secondary Navigation Links (UCity sans-serif) -->
    <ul class="MenuSecondaryNavigation-module__root Menu-module__secondary">
      <li class="MenuSecondaryNavigation-module__item">
        <div style="transform: translate(0%, 140%); opacity: 0;">
          <a class="Link MainButton-module__root MenuSecondaryNavigation-module__link MainButton-module__root_details-1 MainButton-module__root_white" aria-label="FAQ" href="/faq">FAQ</a>
        </div>
      </li>
      <li class="MenuSecondaryNavigation-module__item">
        <div style="transform: translate(0%, 140%); opacity: 0;">
          <a class="Link MainButton-module__root MenuSecondaryNavigation-module__link MainButton-module__root_details-1 MainButton-module__root_white" aria-label="Your project" href="/contact">Your project</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
```

---

## Computed Styles (Exact Computed Values)

### A. Root Container Overlay (`Menu-module__root`)
*   `position`: `fixed`
*   `inset`: `0px`
*   `zIndex`: `9` / `20` (Sits directly beneath the top level overlays, covers standard headers)
*   `display`: `block`
*   `pointerEvents`: `none` (When closed/invisible)

### B. Backdrop (`Menu-module__background`)
*   `position`: `absolute`
*   `inset`: `0px`
*   `backgroundColor`: `rgb(0, 0, 0)`

### C. Wrapper (`Menu-module__wrapper`)
*   `display`: `flex`
*   `flexDirection`: `column`
*   `justifyContent`: `center`
*   `height`: `100%`
*   `padding`: `80px 40px`

### D. Primary Links (`MenuNavigation-module__link`)
*   `fontFamily`: `Zodiak, serif`
*   `fontSize`: `73.125px`
*   `lineHeight`: `78.7483px`
*   `fontWeight`: `300`
*   `color`: `rgb(255, 255, 255)`
*   `textDecoration`: `none`

### E. Secondary Links (`MenuSecondaryNavigation-module__link`)
*   `fontFamily`: `UCity, sans-serif`
*   `fontSize`: `22.5px`
*   `lineHeight`: `27px`
*   `fontWeight`: `400`
*   `color`: `rgb(255, 255, 255)`

---

## States & Behaviors

### 1. Slide Stagger Animation (Entrance)
*   **Trigger:** Click menu button to open.
*   **Target CSS shifts:**
    *   Container: `pointer-events: auto`
    *   Backdrop: `opacity: 1` (Fade-in backdrop)
    *   Link wrappers: Slide from `transform: translate(0%, 140%) opacity: 0` to `transform: translate(0%, 0%) opacity: 1`
*   **Stagger delay:** Incremental `50ms` offsets per item row.
*   **Easing:** `transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.6s ease;`

### 2. Scroll Lock Integration
*   Adds `data-lenis-prevent` attribute to prevent parent layout smooth scrolling when overlay menu is active.

---

## Responsive Behavior

*   **Desktop (1440px):** Large links (`73.125px`), vertical flow alignment.
*   **Tablet (768px):** Font size scales to `55px`.
*   **Mobile (390px):** Font size scales to `40px`, paddings compress to center content cleanly.
