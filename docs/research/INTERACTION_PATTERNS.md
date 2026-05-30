# Alpinaire Interaction & Animation Patterns

This document details the micro-interactions, keyframe animations, scroll-driven behaviors, and interactive state transitions that make Alpinaire feel fluid, responsive, and premium.

---

## 1. Primary Page Entrance Animations

When the home page finishes server loading and mounts in the browser client, entrance effects play sequentially:

1.  **Wall Transition Fade Out (`WallTransition-module__root`):**
    *   An initial full-screen overlay backing (`WallTransition-module__background` in solid black) and centered logo (`WallTransition-module__logo` displaying background PNG `/images/Alpinaire logo.png`) are present.
    *   As assets mount, the background and logo fade to `opacity: 0` with `pointer-events: none` enabling clicks on page content.
2.  **Hero Text Fade Up:**
    *   The `GENEVA` strong baseline anchor and primary heading text animate up into viewport focus.
    *   **CSS Transition:** `opacity: 0; transform: translateY(30px);` to `opacity: 1; transform: translateY(0px);` over `0.8s` with `cubic-bezier(0.25, 1, 0.5, 1)` easing.
3.  **Hero Background Shutter Reveal:**
    *   The static background cover image `/images/Hero.png` (present on the hero root and `.HomeHero-module__background`) expands its clip-path mask (`clip-path: inset(0%)`) to reveal the core watch visual. The raw image tag remains hidden (`opacity: 0 !important`).

---

## 2. Global Navigation Overlay Interaction

### A. Menu Toggle Button Label Shift
*   **Trigger:** Click menu button.
*   **Mechanism:** Inside `MenuButton-module__wrapper` there are two sibling span nodes: `.MenuButton-module__label_open` ("Menu") and `.MenuButton-module__label_close` ("Close").
*   **Behavior:** 
    *   Open State: Open label translates up/fades out (`translateY(-100%) opacity: 0`), and Close label translates up from bottom edge into centered focus (`translateY(0%) opacity: 1`).
    *   Close State: Reverses the transition timeline.
*   **CSS Timing:** `transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;`

### B. Fullscreen Menu Entrance Stagger
*   **Trigger:** Open menu.
*   **Mechanism:** Primary navigation items are masked inside clipping parent boundaries (`MenuNavigation-module__item`).
*   **Initial State (Closed):** `translate: none; opacity: 0; transform: translate(0%, 140%);`
*   **Active State (Open):** `translate: none; opacity: 1; transform: translate(0%, 0%);`
*   **Transition Pattern:** Staggered entrance. First link plays, followed by 2nd, 3rd, and 4th links with a `50ms` incremental delay multiplier (`delay: 0.1s`, `0.15s`, `0.2s`, `0.25s`).
*   **CSS Timing:** `transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.6s ease;`

---

## 3. Row Accordion Autoplay Video Loop (`HomeKeywords`)

This is a central scroll-and-interaction highlight row system:

*   **Default State:** The vertical list consists of three items: Swiss quality, Innovation, Tradition. Only the first item (`HomeKeywords-module__item_active`) is expanded by default. The rest are contracted (`HomeKeywords-module__item_inactive`).
*   **Trigger:** Click or Hover.
*   **Active Behavior:**
    *   The active title text turns white or remains stark black.
    *   The inline video mask (`HomeKeywords-module__media`) scales and expands.
    *   The video element plays muted looping watchmaking sequences (`autoplay`, `loop`, `muted`, `playsinline`).
*   **Inactive Behavior:**
    *   The media container width/height contracts to `0px` or shrinks completely.
    *   Opacity drops.

---

## 4. Scroll-Driven Media Parallax

To add depth to vertical page scrolling, all large media boxes (Hero watch backing and project cards) use a scroll listener or CSS parallax offset:

*   **Mechanism:**
    *   Container has `overflow: hidden; position: relative;`.
    *   Inner `IMG` or `VIDEO` element is styled with `will-change: transform; transform-origin: center;`.
    *   On Scroll: The element's transform is updated: `transform: translate3d(0px, Y%, 0px) scale(1.15)`.
    *   As you scroll past, the `Y` offset shifts from `-10%` to `10%`, scrolling the image at a slightly different rate than the container frame.

---

## 5. Project Card Hover Micro-Interactions

Hovering over a `ProjectCard` triggers a two-part elegant highlight:

### A. Title Slide-Up Text Masking
*   **Mechanism:** Titles are wrapped in a clipping box (`.lineParent` with `overflow: hidden;`).
*   **Behavior:** The child text node (`.lineChild`) translates up from below the mask.
*   **States:**
    *   Normal: `transform: translate(0%, 120%); opacity: 0;`
    *   Hover: `transform: translate(0%, 0%); opacity: 1;`
*   **CSS Timing:** `transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;`

### B. Media Frame Zoom
*   **Behavior:** The watch image zooms within its border frame bounds.
*   **States:**
    *   Normal: `scale(1.15)` (plus any parallax translations).
    *   Hover: `scale(1.23)` (zoom-in effect).
*   **CSS Timing:** `transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);`

---

## 6. Bottom Cookie Banner Entrance

*   **Trigger:** Component mount (first session view).
*   **Mechanism:** Slide-up from bottom edge.
*   **States:**
    *   Hidden: `transform: translateY(110%); opacity: 0;`
    *   Shown (`CookiesBanner-module__root_show`): `transform: translateY(0%); opacity: 1;`
*   **CSS Timing:** `transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease;`

---

## 7. Legal Notice Modal - **DISABLED**
*   The modal and fullscreen background overlay `.LegalNotice-module__root__VD04x` are deactivated in styling rules.
*   **Transition behavior:** None (remains permanently hidden, input interaction pointer-events disabled).
