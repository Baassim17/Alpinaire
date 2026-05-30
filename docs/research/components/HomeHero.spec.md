# HomeHero Component Specification

## Overview
- **Target file:** `src/components/HomeHero.tsx`
- **Screenshot:** `docs/design-references/hero.png`
- **Interaction model:** Static text overlay with entrance reveals and scroll-driven parallax background frame shift.

---

## DOM Structure

```html
<section class="HomeHero-module__root" style="padding-top: 611.32px; background-image: url('/images/Hero.png?v=alpinaire-hero-2') !important;">
  <!-- Uppercase Baseline City Marker -->
  <strong class="HomeHero-module__baseline" style="opacity: 1;">GENEVA </strong>
  
  <div class="HomeHero-module__wrapper">
    <!-- Surtitle -->
    <div class="HomeHero-module__surtitle">Alpinaire, the custom watchmaking studio</div>
    <!-- Primary H1 Title -->
    <h1 class="HomeHero-module__title">The Ultimate Luxury: Making Time Your Own</h1>
  </div>
  
  <!-- Media Backdrop Block (Styled with cover background visual) -->
  <div class="HomeHero-module__background" style="opacity: 1; background-image: url('/images/Hero.png?v=alpinaire-hero-2') !important;">
    <picture class="HomeHero-module__backgroundWrapper" style="clip-path: inset(0%); transform: translate(0px, 0px);">
      <!-- Raw watch image tag is hidden in layouts -->
      <img class="HomeHero-module__backgroundImage" src="https://api.alpinaire.com/uploads/ALTER_ROLEX_2_f67d689f05.jpg" alt="Alpinaire" draggable="false" style="opacity: 0 !important;">
    </picture>
  </div>
</section>
```

---

## Computed Styles (Exact Computed Values)

### A. Root Container (`HomeHero-module__root`)
*   `position`: `relative`
*   `height`: `100vh`
*   `width`: `100%`
*   `backgroundColor`: `rgb(0, 0, 0)`
*   `color`: `rgb(255, 255, 255)`
*   `paddingTop`: `611.32px` (Desktop offset pushes baseline watch details exactly into central vertical alignment)
*   `overflow`: `hidden`
*   **Media Fallback Background Override:**
    *   `backgroundImage`: `url("/images/Hero.png?v=alpinaire-hero-2") !important;`
    *   `backgroundPosition`: `center !important;`
    *   `backgroundSize`: `cover !important;`
    *   `backgroundRepeat`: `no-repeat !important;`

### B. Baseline Text Marker (`HomeHero-module__baseline`)
*   `position`: `absolute`
*   `top`: `40px`
*   `left`: `40px`
*   `fontFamily`: `Zodiak, serif`
*   `fontSize`: `30px`
*   `lineHeight`: `33.333px`
*   `fontWeight`: `300`
*   `textTransform`: `uppercase`

### C. Wrapper (`HomeHero-module__wrapper`)
*   `position`: `relative`
*   `zIndex`: `2`
*   `padding`: `0px 40px`

### D. Surtitle (`HomeHero-module__surtitle`)
*   `fontFamily`: `UCity, sans-serif`
*   `fontSize`: `18.75px`
*   `lineHeight`: `22.5px`
*   `textTransform`: `uppercase` or normal body casing

### E. Primary H1 Title (`HomeHero-module__title`)
*   `fontFamily`: `Zodiak, serif`
*   `fontSize`: `67.5px`
*   `lineHeight`: `67.5px`
*   `fontWeight`: `300`

### F. Backdrop Container (`HomeHero-module__background`)
*   `position`: `absolute`
*   `inset`: `0px`
*   `width`: `100%`
*   `height`: `100%`
*   `zIndex`: `1`
*   **Media Fallback Background Override:**
    *   `backgroundImage`: `url("/images/Hero.png?v=alpinaire-hero-2") !important;`
    *   `backgroundPosition`: `center !important;`
    *   `backgroundSize`: `cover !important;`
    *   `backgroundRepeat`: `no-repeat !important;`
*   Inner image element `.HomeHero-module__backgroundImage__fqnu4`: `opacity: 0 !important;` (Raw Strapi watch visual is hidden)

---

## States & Behaviors

### 1. Entrance Reveals
*   On load, the backdrop wrapper uses a masking clip expansion (`clip-path: inset(0%)`) to create a smooth shutter opening visual.
*   Text blocks fade up smoothly from `translateY(30px) opacity: 0` to `translateY(0%) opacity: 1` using a `0.8s` cubic-bezier easing timeline.

### 2. Scroll Parallax
*   As the user scrolls, a scroll hook updates the transform styling on the `.HomeHero-module__background` container:
    *   `transform: translate3d(0px, scrollOffset * -0.15px, 0px) scale(1.05)`

---

## Responsive Behavior

*   **Desktop (1440px):** Full scale size titles (`67.5px`), offset pad `611.32px`.
*   **Tablet (768px):** Font size scales to `45px`, paddings shrink to `24px`.
*   **Mobile (390px):** Font size scales to `35px`, offset padding reduces, centering the watch graphic exactly within phone dimensions.
