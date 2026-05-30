(function () {
  const selectors = {
    root: ".HomePage-module__root__z770C",
    hero: ".HomeHero-module__root__X32-X",
    background: ".HomeHero-module__background__-bq4K",
    wrapper: ".HomeHero-module__backgroundWrapper__6--iy",
    image: ".HomeHero-module__backgroundImage__fqnu4",
    textWrapper: ".HomeHero-module__wrapper__7X8cE",
    baseline: ".HomeHero-module__baseline__PZXo3",
    loader: ".Loader-module__root__8SxjQ",
    progress: ".Loader-module__progress__22ikY",
    logo: ".Loader-module__logo__35CEf",
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentPath = window.location.pathname;
  let revealId = 0;
  let hasPlayedReveal = false;
  let lastScrollY = -1;
  let isMonitoring = false;
  let scheduleTimeout = null;

  function isHomePath() {
    return window.location.pathname === "/" || window.location.pathname === "";
  }

  function getHeroParts() {
    const root = document.querySelector(selectors.root);
    const hero = document.querySelector(selectors.hero);
    const background = document.querySelector(selectors.background);
    const wrapper = document.querySelector(selectors.wrapper);
    const image = document.querySelector(selectors.image);
    const textWrapper = document.querySelector(selectors.textWrapper);
    const baseline = document.querySelector(selectors.baseline);
    const loader = document.querySelector(selectors.loader);
    const progress = document.querySelector(selectors.progress);
    const logo = document.querySelector(selectors.logo);
    return { root, hero, background, wrapper, image, textWrapper, baseline, loader, progress, logo };
  }

  function isPageReady(parts) {
    if (!isHomePath()) return false;
    if (!parts.root) return false;
    
    // Check if the root section is visually loaded
    const rootStyle = window.getComputedStyle(parts.root);
    const isRootVisible = rootStyle.visibility !== "hidden" && rootStyle.display !== "none";
    if (!isRootVisible) return false;

    // The page is ready if the loader is missing or visually hidden
    if (!parts.loader) return true;
    
    const loaderStyle = window.getComputedStyle(parts.loader);
    const isLoaderHidden = 
      loaderStyle.display === "none" || 
      loaderStyle.opacity === "0" || 
      loaderStyle.visibility === "hidden" ||
      parseFloat(loaderStyle.opacity) < 0.05;
      
    return isLoaderHidden;
  }

  function finish(background, wrapper, image, baseline) {
    if (background) background.style.opacity = "1";
    if (wrapper) {
      wrapper.style.transform = "scale(1)";
      wrapper.style.clipPath = "inset(0%)";
    }
    if (image) {
      image.style.opacity = "1";
    }
    if (baseline) baseline.style.opacity = "1";
  }

  function playReveal() {
    if (hasPlayedReveal) return true;
    const parts = getHeroParts();
    if (!parts.hero || !parts.background || !parts.wrapper || !isPageReady(parts)) return false;

    hasPlayedReveal = true;

    const key = `${window.location.pathname}:${performance.now()}`;
    parts.hero.dataset.alpinaireHeroReveal = key;

    if (prefersReducedMotion.matches) {
      finish(parts.background, parts.wrapper, parts.image, parts.baseline);
      return true;
    }

    // Cancel existing reveals
    parts.background.getAnimations().forEach((animation) => animation.cancel());
    parts.wrapper.getAnimations().forEach((animation) => animation.cancel());
    if (parts.image) parts.image.getAnimations().forEach((animation) => animation.cancel());
    if (parts.baseline) parts.baseline.getAnimations().forEach((animation) => animation.cancel());

    // Initialize state
    parts.background.style.opacity = "0";
    parts.wrapper.style.transform = "scale(1.09)";
    parts.wrapper.style.clipPath = "inset(7%)";
    if (parts.image) parts.image.style.opacity = "0";
    if (parts.baseline) parts.baseline.style.opacity = "0";

    requestAnimationFrame(() => {
      // Fade in the background container
      const fade = parts.background.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 520, easing: "ease-in-out", fill: "forwards" }
      );

      // Expand and shrink visual shroud
      const mask = parts.wrapper.animate(
        [
          { transform: "scale(1.09)", clipPath: "inset(7%)" },
          { transform: "scale(1)", clipPath: "inset(0%)" },
        ],
        {
          delay: 240,
          duration: 1450,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        }
      );

      if (parts.image) {
        parts.image.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { delay: 100, duration: 400, easing: "ease-out", fill: "forwards" }
        );
      }

      if (parts.baseline) {
        parts.baseline.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { delay: 360, duration: 480, easing: "ease-out", fill: "forwards" }
        );
      }

      mask.addEventListener("finish", () => {
        finish(parts.background, parts.wrapper, parts.image, parts.baseline);
      }, { once: true });

      fade.addEventListener("finish", () => {
        parts.background.style.opacity = "1";
        if (parts.image) parts.image.style.opacity = "1";
      }, { once: true });
    });

    return true;
  }

  // High-performance scroll parallax hook (strictly for the background image)
  function updateParallax() {
    if (!isHomePath()) return;
    const y = window.scrollY || window.pageYOffset;
    if (y === lastScrollY) return;
    lastScrollY = y;

    const parts = getHeroParts();
    if (!parts.hero) return;

    const viewportHeight = window.innerHeight;
    // Stop updates if the hero section has been completely scrolled past
    if (y > viewportHeight + 100) return;

    // 1. Parallax for Background Image node (watch)
    if (parts.image) {
      const parallaxY = y * 0.28; // moves down at 0.28x rate of scroll
      const scale = 1.0 + (y / viewportHeight) * 0.08; // slow zoom in
      parts.image.style.transform = `translate3d(0px, ${parallaxY}px, 0px) scale(${scale})`;
    }
  }

  // Preloader exit orchestration (React-safe observer)
  function monitorPreloader() {
    if (isMonitoring) return;
    isMonitoring = true;
    let checkCount = 0;
    
    function check() {
      const parts = getHeroParts();
      
      // If page is ready (loader is gone or hiding), play reveal and stop monitoring
      if (isPageReady(parts)) {
        playReveal();
        isMonitoring = false;
        return;
      }

      checkCount++;
      if (checkCount < 300) { // check for up to 15s (50ms * 300)
        setTimeout(check, 50);
      } else {
        playReveal();
        isMonitoring = false;
      }
    }
    
    check();
  }

  function scheduleReveal() {
    if (scheduleTimeout) return;
    const id = ++revealId;
    let attempts = 0;
    hasPlayedReveal = false;

    function tick() {
      if (id !== revealId) {
        scheduleTimeout = null;
        return;
      }
      
      const parts = getHeroParts();
      if (isPageReady(parts)) {
        playReveal();
        scheduleTimeout = null;
        return;
      }
      
      attempts += 1;
      if (attempts < 180) {
        scheduleTimeout = requestAnimationFrame(tick);
      } else {
        scheduleTimeout = null;
      }
    }

    scheduleTimeout = requestAnimationFrame(tick);
  }

  function onRouteMaybeChanged() {
    const nextPath = window.location.pathname;
    if (nextPath !== currentPath) {
      currentPath = nextPath;
      hasPlayedReveal = false;
      if (isHomePath()) {
        scheduleReveal();
        monitorPreloader();
      }
    }
  }

  // Hook pushState / replaceState for client router transitions
  ["pushState", "replaceState"].forEach((method) => {
    const original = history[method];
    history[method] = function () {
      const result = original.apply(this, arguments);
      setTimeout(onRouteMaybeChanged, 0);
      return result;
    };
  });

  window.addEventListener("popstate", () => setTimeout(onRouteMaybeChanged, 0));
  window.addEventListener("pageshow", () => {
    scheduleReveal();
    monitorPreloader();
  });
  window.addEventListener("load", () => {
    scheduleReveal();
    monitorPreloader();
  });
  window.addEventListener("scroll", updateParallax, { passive: true });

  // Watch DOM mutations for instant reveal triggers
  new MutationObserver(() => {
    const parts = getHeroParts();
    if (isHomePath() && parts.hero && !parts.hero.dataset.alpinaireHeroReveal && !hasPlayedReveal) {
      if (isPageReady(parts)) {
        playReveal();
      } else {
        scheduleReveal();
        monitorPreloader();
      }
    }
    onRouteMaybeChanged();
  }).observe(document.documentElement, { 
    childList: true, 
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class"]
  });
})();
