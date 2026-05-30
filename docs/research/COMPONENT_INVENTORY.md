# Alpinaire Component Inventory

This inventory documents all reusable, custom, and interactive UI components extracted from the Alpinaire codebase snapshots and DOM architectures.

---

## 1. Global / Overlay Components

### A. Navigation Header (`Header`)
*   **Purpose:** Branding and global navigation links. Fixed to the top window edge. Transparent by default but overlays content.
*   **DOM Structure:**
    *   `HEADER.Header-module__root`
        *   `DIV.Header-module__wrapper`
            *   `BUTTON.MenuButton-module__root` (Left menu trigger)
            *   `BUTTON.LogoHeader-module__root` (Centered brand logo button - uses PNG background-image override)
            *   `A.Link.Header-module__button_cta` (Right CTA underline link)
*   **Variants:** `large` mode on desktop, compact margins on mobile.
*   **Asset Override:** Center brand logo hides inner SVG paths and displays `/images/Alpinaire logo.png` via CSS `::before` pseudo-class. 
*   **Interactions:** Hover underline on right CTA; clicking Menu Button toggles menu overlay.

### B. Fullscreen Menu Overlay (`Menu`)
*   **Purpose:** Primary site navigation links. Opens full screen.
*   **DOM Structure:**
    *   `NAV.Menu-module__root` (Container, `id="menu"`, absolute overlay)
        *   `DIV.Menu-module__background` (Stark black backing)
        *   `DIV.Menu-module__wrapper` (Centering pad)
            *   `UL.MenuNavigation-module__root` (Primary vertical list)
                *   `LI` → `DIV` (translate animations) → `A.MenuNavigation-module__link`
            *   `UL.MenuSecondaryNavigation-module__root` (Secondary links)
                *   `LI` → `DIV` → `A.MenuSecondaryNavigation-module__link`
*   **Interactions:** Opens full-screen with slide-up text stagger transition. Sets page body scroll lock (`data-lenis-prevent`).

### C. Legal Notice Modal (`LegalNotice`) - **DISABLED**
*   **Status:** **DEACTIVATED / DISABLED** in live stylesheets (`display: none !important; visibility: hidden !important; pointer-events: none !important;`).
*   **Note:** Although the markup resides in the DOM tree, it is completely hidden and disabled from the layout flow and client events.

### D. Cookies Banner (`CookiesBanner`)
*   **Purpose:** Bottom cookie consent drawer.
*   **DOM Structure:**
    *   `DIV.CookiesBanner-module__root` (Fixed to bottom, solid black background)
        *   `DIV.CookiesBanner-module__wrapper`
            *   `DIV.CookiesBanner-module__text` (Notice description + underline policy link)
            *   `DIV.CookiesBanner-module__buttons` (Control actions)
                *   `BUTTON` (Accept - White text / underline button)
                *   `BUTTON.CookiesBanner-module__button_refuse` (Decline - Gray outline / custom button)
*   **Interactions:** Animates in from bottom edge on load. Dismissed by clicking either action.

---

## 2. Page Content / Layout Components

### A. Home Hero (`HomeHero`)
*   **Purpose:** Above-the-fold brand statement, localizing origin and central watch image.
*   **DOM Structure:**
    *   `SECTION.HomeHero-module__root` (Full viewport height, background-image fallback `/images/Hero.png`)
        *   `STRONG.HomeHero-module__baseline` (Fixed visual tag, `GENEVA`)
        *   `DIV.HomeHero-module__wrapper`
            *   `DIV.HomeHero-module__surtitle` ("Alpinaire, the custom watchmaking studio")
            *   `H1.HomeHero-module__title` ("The Ultimate Luxury: Making Time Your Own")
        *   `DIV.HomeHero-module__background` (Styled with background-image override `/images/Hero.png`)
            *   `PICTURE.HomeHero-module__backgroundWrapper` (Hidden image content)
                *   `IMG.HomeHero-module__backgroundImage` (Set to opacity 0)
*   **Asset Override:** The raw image tag is hidden (`opacity: 0 !important`), and the section relies on `/images/Hero.png` applied via CSS background rules directly to the `.HomeHero-module__root` and `.HomeHero-module__background`.
*   **Interactions:** Text triggers fade-up; background has slow vertical parallax scroll shift.

### B. Block Text Column (`BlockTextColumn`)
*   **Purpose:** Crisp central paragraph conveying the watch customization manifesto.
*   **DOM Structure:**
    *   `SECTION.BlockTextColumn-module__root` (White background, maximum spacing padding)
        *   `DIV.BlockTextColumn-module__text` (Stark layout wrapper)
            *   `P` → `SPAN.text` (Large geometric text, UCity light `26.25px`)

### C. Keywords Row Accordion (`HomeKeywords`)
*   **Purpose:** Dynamic vertical stacked highlights of brand pillars (Swiss quality, Innovation, Tradition).
*   **DOM Structure:**
    *   `SECTION.HomeKeywords-module__root`
        *   `DIV.HomeKeywords-module__wrapper`
            *   `UL.HomeKeywords-module__list`
                *   `LI.HomeKeywords-module__item` (Each vertical bar row)
                    *   `H2.HomeKeywords-module__title` (Zodiak serif title)
                    *   `DIV.HomeKeywords-module__media` (Inline video clip masking container)
                        *   `VIDEO.VideoLoop-module__root` (Autoplay muted loop MP4)
*   **Variants:** `HomeKeywords-module__item_active` (Active row - reveals video container), `HomeKeywords-module__item_inactive` (Muted/contracted).
*   **Interactions:** Auto-cycles active highlights or triggers on click/hover to expand video clip frame width.

### D. Craftsmanship Split Visuals (`HomeTextVisuals`)
*   **Purpose:** Large visual split of craftsmanship and workshop environment.
*   **DOM Structure:**
    *   `SECTION.HomeTextVisuals-module__root`
        *   `DIV.HomeTextVisuals-module__wrapper`
            *   `DIV.HomeTextVisuals-module__content`
                *   `H2.HomeTextVisuals-module__title` ("Customization is a limitless form of expression")
            *   `UL.HomeTextVisuals-module__visuals` (Side by side grid/flex layout)
                *   `LI.HomeTextVisuals-module__media`
                    *   `DIV.HomeTextVisuals-module__mediaWrapper`
                        *   `VIDEO.VideoLoop-module__root` (Workshop autoplay looping clips)

### E. Projects Grid (`BlockProjects` & `ProjectsGrid`)
*   **Purpose:** Display highlights of bespoke watch customizations.
*   **DOM Structure:**
    *   `SECTION.BlockProjects-module__root` (White background)
        *   `DIV.BlockProjects-module__wrapper`
            *   `DIV.BlockProjects-module__surTitle` ("Discover")
            *   `H2.BlockProjects-module__title` ("Our work")
        *   `DIV.ProjectsGrid-module__root`
            *   `UL.ProjectsGrid-module__list`
                *   `LI.ProjectsGrid-module__item` → `ProjectCard`

### F. Project Card (`ProjectCard`)
*   **Purpose:** Direct details navigation link showing specific watch projects.
*   **DOM Structure:**
    *   `A.Link.ProjectCard-module__root`
        *   `H3.ProjectCard-module__title`
            *   `DIV.lineParent` (Clipping masking text box)
                *   `DIV.lineChild` (Inner text value e.g. "No. 054")
        *   `DIV.ProjectCard-module__subTitle` (Subtitle metadata, if any)
        *   `DIV.ProjectCard-module__media` (Aspect ratio clipping image block)
            *   `PICTURE.ProjectCard-module__mediaWrapper` ( landscape or portrait mode)
                *   `IMG.ProjectCard-module__mediaImage`
*   **Variants:**
    *   `ProjectCard-module__mediaWrapper_landscape` (Landscape horizontal layout wrapper)
    *   `ProjectCard-module__mediaWrapper_portrait` (Portrait tall vertical layout wrapper)
*   **Interactions:** Hovering on card zooms image slightly inside parent (`scale(1.15)`) and triggers the title slide-up `lineChild` masking translation.

---

## 3. Structural Footer (`Footer`)

*   **Purpose:** Site directory links, legal indicators, and disclaimers.
*   **DOM Structure:**
    *   `FOOTER.Footer-module__root` (Stark black full-width section)
        *   `DIV.Footer-module__wrapper`
            *   `NAV.Footer-module__navigation` (Horizontal wraps)
                *   `UL` → `LI` → `A.FooterNavigation-module__link`
            *   `DIV.Footer-module__socials` (Social channels index)
                *   `H2.Socials-module__title` ("Follow")
                *   `UL` → `LI` → `A.Socials-module__link`
            *   `DIV.LegalInfos-module__root`
                *   `UL.LegalInfos-module__list` (**HIDDEN/STRIPPED** in layout: `.LegalInfos-module__list__mTmYH { display: none !important; }`)
                *   `DIV.LegalInfos-module__copyright` ("2026© Alpinaire...")
                *   `DIV.LegalInfos-module__notice` (Affiliation / commercial notice block)
*   **Interactions:** Underline link states on hover.
