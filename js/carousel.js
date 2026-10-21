(function () {
  document.querySelectorAll("[data-food-carousel]").forEach(function (el) {
    var track = el.querySelector(".food-carousel-track");
    if (!track || track.getAttribute("data-cloned")) return;
    Array.prototype.slice.call(track.children).forEach(function (img) {
      var c = img.cloneNode(true);
      c.setAttribute("alt", "");
      c.setAttribute("aria-hidden", "true");
      track.appendChild(c);
    });
    track.setAttribute("data-cloned", "1");
  });
})();
