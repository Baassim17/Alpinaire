(function () {
  const selectors = {
    root: ".HomePage-module__root__z770C",
    hero: ".HomeHero-module__root__X32-X",
    background: ".HomeHero-module__background__-bq4K",
    wrapper: ".HomeHero-module__backgroundWrapper__6--iy",
    baseline: ".HomeHero-module__baseline__PZXo3",
    loader: ".Loader-module__root__8SxjQ",
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentPath = window.location.pathname;
  let revealId = 0;

  function isHomePath() {
    return window.location.pathname === "/" || window.location.pathname === "";
  }

  function getHeroParts() {
    const root = document.querySelector(selectors.root);
    const hero = document.querySelector(selectors.hero);
    const background = document.querySelector(selectors.background);
    const wrapper = document.querySelector(selectors.wrapper);
    const baseline = document.querySelector(selectors.baseline);
    return { root, hero, background, wrapper, baseline };
  }

  function isPageReady(root) {
    return (
      isHomePath() &&
      root &&
      window.getComputedStyle(root).visibility !== "hidden" &&
      !document.querySelector(selectors.loader)
    );
  }

  function finish(background, wrapper, baseline) {
    background.style.opacity = "1";
    wrapper.style.transform = "scale(1)";
    wrapper.style.clipPath = "inset(0%)";
    if (baseline) baseline.style.opacity = "1";
  }

  function playReveal() {
    const { root, hero, background, wrapper, baseline } = getHeroParts();
    if (!hero || !background || !wrapper || !isPageReady(root)) return false;

    const key = `${window.location.pathname}:${performance.now()}`;
    hero.dataset.alpinaireHeroReveal = key;

    if (prefersReducedMotion.matches) {
      finish(background, wrapper, baseline);
      return true;
    }

    background.getAnimations().forEach((animation) => animation.cancel());
    wrapper.getAnimations().forEach((animation) => animation.cancel());
    if (baseline) baseline.getAnimations().forEach((animation) => animation.cancel());

    background.style.opacity = "0";
    wrapper.style.transform = "scale(1.09)";
    wrapper.style.clipPath = "inset(7%)";
    if (baseline) baseline.style.opacity = "0";

    requestAnimationFrame(() => {
      const fade = background.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 520, easing: "ease-in-out", fill: "forwards" },
      );

      const mask = wrapper.animate(
        [
          { transform: "scale(1.09)", clipPath: "inset(7%)" },
          { transform: "scale(1)", clipPath: "inset(0%)" },
        ],
        {
          delay: 240,
          duration: 1450,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        },
      );

      if (baseline) {
        baseline.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { delay: 360, duration: 480, easing: "ease-out", fill: "forwards" },
        );
      }

      mask.addEventListener("finish", () => finish(background, wrapper, baseline), { once: true });
      fade.addEventListener("finish", () => {
        background.style.opacity = "1";
      }, { once: true });
    });

    return true;
  }

  function scheduleReveal() {
    const id = ++revealId;
    let attempts = 0;

    function tick() {
      if (id !== revealId) return;
      if (playReveal()) return;
      attempts += 1;
      if (attempts < 180) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function onRouteMaybeChanged() {
    const nextPath = window.location.pathname;
    if (nextPath !== currentPath) {
      currentPath = nextPath;
      if (isHomePath()) scheduleReveal();
    }
  }

  ["pushState", "replaceState"].forEach((method) => {
    const original = history[method];
    history[method] = function () {
      const result = original.apply(this, arguments);
      setTimeout(onRouteMaybeChanged, 0);
      return result;
    };
  });

  window.addEventListener("popstate", () => setTimeout(onRouteMaybeChanged, 0));
  window.addEventListener("pageshow", scheduleReveal);
  window.addEventListener("load", scheduleReveal);

  new MutationObserver(() => {
    const { hero } = getHeroParts();
    if (isHomePath() && hero && !hero.dataset.alpinaireHeroReveal) scheduleReveal();
    onRouteMaybeChanged();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
