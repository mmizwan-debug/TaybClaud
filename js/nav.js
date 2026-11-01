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

// WhatsApp click tracking (Google Ads "WhatsApp click" + GA4 event + Meta Pixel "Contact")
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
  if (!a) return;
  if (typeof gtag === 'function') {
    gtag('event', 'conversion', { send_to: 'AW-18529136473/GkhACMrgz6cdENnesINF', value: 1.0, currency: 'AED' });
    gtag('event', 'whatsapp_click', { link_url: a.href, page_path: location.pathname });
  }
  // Meta Pixel standard "Contact" event
  if (typeof fbq === 'function') fbq('track', 'Contact', { content_name: 'WhatsApp click', content_category: location.pathname });
}, true);

// Registration source tagging: remember where the visitor came from (first visit, 30 days)
// and pass it to the Paperform registration links, so each registration shows its source.
(function () {
  var KEY = 'tayb_src_v1', DAYS = 30;
  function read() { try { var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o && Date.now() - o.t < DAYS * 864e5) return o; } catch (e) {} return null; }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  var q = new URLSearchParams(location.search), ref = document.referrer || '', refHost = '';
  try { refHost = ref ? new URL(ref).hostname : ''; } catch (e) {}
  var cur = {
    utm_source: q.get('utm_source') || '', utm_medium: q.get('utm_medium') || '', utm_campaign: q.get('utm_campaign') || '',
    utm_content: q.get('utm_content') || '', gclid: q.get('gclid') || q.get('gbraid') || q.get('wbraid') || '', fbclid: q.get('fbclid') || ''
  };
  var channel = '';
  if (cur.gclid || /^google$/i.test(cur.utm_source) && /cpc|paid/i.test(cur.utm_medium)) channel = 'google_ads';
  else if (cur.fbclid && /paid|cpc/i.test(cur.utm_medium) || /^(facebook|fb|ig|instagram|meta)$/i.test(cur.utm_source) && /paid|cpc/i.test(cur.utm_medium)) channel = 'meta_ads';
  else if (cur.utm_source) channel = cur.utm_source.toLowerCase();
  else if (cur.fbclid || /facebook|instagram/i.test(refHost)) channel = 'meta_organic';
  else if (/google\./i.test(refHost)) channel = 'google_search';
  else if (/bing|yahoo|duckduckgo|chatgpt|perplexity|gemini/i.test(refHost)) channel = refHost.replace(/^www\./, '').split('.')[0];
  else if (refHost && refHost.indexOf('taybmeals') < 0) channel = 'referral';
  var stored = read();
  // a new paid click always wins; otherwise keep the first known source
  if (channel && (!stored || channel === 'google_ads' || channel === 'meta_ads')) {
    stored = { t: Date.now(), src: channel, utm_source: cur.utm_source, utm_medium: cur.utm_medium, utm_campaign: cur.utm_campaign, utm_content: cur.utm_content, gclid: cur.gclid, fbclid: cur.fbclid, landing: location.pathname };
    save(stored);
  }
  if (!stored) { stored = { t: Date.now(), src: 'direct', landing: location.pathname }; save(stored); }
  function decorate() {
    var links = document.querySelectorAll('a[href*="taybmeals.paperform.co"]');
    for (var i = 0; i < links.length; i++) {
      try {
        var u = new URL(links[i].href);
        ['src', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid', 'fbclid', 'landing'].forEach(function (k) {
          if (stored[k]) u.searchParams.set(k, String(stored[k]).slice(0, 150));
        });
        links[i].href = u.toString();
      } catch (e) {}
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decorate); else decorate();
})();
