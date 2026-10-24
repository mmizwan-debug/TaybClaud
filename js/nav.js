(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  var overlay = document.getElementById("navOverlay");
  if (!toggle || !nav || !overlay) return;

  function openNav() {
    nav.classList.add("nav-open");
    overlay.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("nav-locked");
  }

  function closeNav() {
    nav.classList.remove("nav-open");
    overlay.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-locked");
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.contains("nav-open");
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  overlay.addEventListener("click", closeNav);

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeNav();
    }
  });
})();

// WhatsApp click tracking (Google Ads conversion "WhatsApp click" + GA4 event)
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
  if (!a || typeof gtag !== 'function') return;
  gtag('event', 'conversion', { send_to: 'AW-18529136473/GkhACMrgz6cdENnesINF', value: 1.0, currency: 'AED' });
  gtag('event', 'whatsapp_click', { link_url: a.href, page_path: location.pathname });
}, true);
