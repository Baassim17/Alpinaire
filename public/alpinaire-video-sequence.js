(function () {
  var sectionSelector = ".HomeTextVisuals-module__root__uk8v4";
  var videoSelector = ".HomeTextVisuals-module__mediaVideo__-n-lb";
  var sources = [
    "/videos/Artisan_assembling.webm",
    "/videos/Artisan_packaging.webm"
  ];
  var retryCount = 0;

  function setupSequence() {
    var section = document.querySelector(sectionSelector);
    if (!section) {
      if (retryCount++ < 20) window.setTimeout(setupSequence, 250);
      return;
    }

    var videos = Array.prototype.slice.call(section.querySelectorAll(videoSelector)).slice(0, 2);
    if (videos.length < 2) {
      if (retryCount++ < 20) window.setTimeout(setupSequence, 250);
      return;
    }

    if (section.dataset.alpinaireVideoSequence === "ready") return;
    section.dataset.alpinaireVideoSequence = "ready";

    videos.forEach(function (video, index) {
      if (video.getAttribute("src") !== sources[index]) {
        video.src = sources[index];
        video.load();
      }
      video.loop = true;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("autoplay", "");
      video.preload = "auto";
      video.setAttribute("playsinline", "");
      video.setAttribute("muted", "");
      video.setAttribute("loop", "");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupSequence);
  } else {
    setupSequence();
  }

  window.addEventListener("load", setupSequence);
})();
