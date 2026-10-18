(function () {
  var ZONES = {
    A: {
      label: "Zone A",
      bf: "By 5:00 AM",
      dinner: "Before 7:00 PM",
      areas: [
        "Dubai South", "Dubai Investment Park (DIP)", "Dubai Industrial City (DIC)",
        "Al Quoz", "Jebel Ali", "Al Maktoum Airport Area", "Dubai Production City / IMPZ",
        "Remraam", "Jumeirah Village Circle (JVC)", "Jumeirah Village Triangle (JVT)",
        "Dubai Sports City", "Motor City"
      ]
    },
    B: {
      label: "Zone B",
      bf: "Before 7:30 AM",
      dinner: "Before 8:30 PM",
      areas: [
        "Al Furjan", "Discovery Gardens", "Dubai Marina", "JBR", "JLT",
        "Downtown Dubai", "Business Bay", "World Trade Centre (WTC)"
      ]
    },
    C: {
      label: "Zone C",
      bf: "Before 7:00 AM",
      dinner: "Before 8:00 PM",
      areas: ["Bur Dubai", "Deira", "Karama", "Oud Metha", "Satwa"]
    },
    D: {
      label: "Zone D",
      bf: "Before 7:00 AM",
      dinner: "Before 7:00 PM",
      areas: [
        "Al Barsha", "Jumeirah", "Umm Suqeim", "Al Safa", "Al Nahda", "Al Qusais",
        "Al Rashidiya", "Mirdif", "International City", "Dubai Silicon Oasis",
        "Academic City",
        "Dubailand", "Mudon", "MBR City", "Festival City", "Nadd Al Sheba"
      ]
    }
  };

  var WHATSAPP_NUMBER = "971509487880";
  var SHARE_URL = "https://taybmeals.com/delivery-timings.html";

  function shareLink(area) {
    return SHARE_URL + (area ? "?area=" + encodeURIComponent(area) : "");
  }

  function renderOverview(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var html = "";
    Object.keys(ZONES).forEach(function (key) {
      var z = ZONES[key];
      html += '<div class="zone-overview-card">' +
        '<div class="zone-overview-head"><span class="zone-overview-name">' + z.label + '</span>' +
        '<span class="zone-approx-tag">Approx.</span></div>' +
        '<div class="zone-overview-times">' +
        '<div><span class="zone-time-label">Breakfast &amp; Lunch</span><strong>' + z.bf + '</strong></div>' +
        '<div><span class="zone-time-label">Dinner</span><strong>' + z.dinner + '</strong></div></div>' +
        '<p class="zone-overview-areas">' + z.areas.join(" \u2022 ") + '</p>' +
        '<a class="btn btn-outline zone-earlier-btn zone-overview-earlier" target="_blank" rel="noopener noreferrer" href="https://wa.me/' + WHATSAPP_NUMBER + '?text=' +
        encodeURIComponent("Hi, I'd like to ask if delivery could be earlier than the usual " + z.bf + " breakfast/lunch slot in " + z.label + ". Kindly advise.") +
        '">Want it earlier? Ask on WhatsApp</a></div>';
    });
    el.innerHTML = html;
  }

  function buildSelect(select) {
    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose your area\u2026";
    select.appendChild(placeholder);

    Object.keys(ZONES).forEach(function (key) {
      var zone = ZONES[key];
      var group = document.createElement("optgroup");
      group.label = zone.label;
      zone.areas.forEach(function (area) {
        var opt = document.createElement("option");
        opt.value = area;
        opt.setAttribute("data-zone", key);
        opt.textContent = area;
        group.appendChild(opt);
      });
      select.appendChild(group);
    });
  }

  function findZoneKey(area) {
    for (var key in ZONES) {
      if (ZONES[key].areas.indexOf(area) !== -1) return key;
    }
    return null;
  }

  function init(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var select = container.querySelector(".area-select");
    var resultWrap = container.querySelector(".zone-result");
    var bfTimeEl = container.querySelector(".zone-bf-time");
    var dinnerTimeEl = container.querySelector(".zone-dinner-time");
    var earlierBtn = container.querySelector(".zone-earlier-btn");

    buildSelect(select);

    var shareWa = container.querySelector(".zone-share-wa");
    var copyBtn = container.querySelector(".zone-copy-link");
    function updateShare() {
      var link = shareLink(select.value);
      if (shareWa) {
        shareWa.href = "https://wa.me/?text=" + encodeURIComponent("Tayb Meals delivery timings (approx.): " + link);
      }
      if (copyBtn) copyBtn.setAttribute("data-link", link);
    }
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var link = copyBtn.getAttribute("data-link") || shareLink("");
        var done = function () {
          var old = copyBtn.getAttribute("data-label") || copyBtn.textContent;
          copyBtn.setAttribute("data-label", old);
          copyBtn.textContent = "Link copied \u2713";
          setTimeout(function () { copyBtn.textContent = old; }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(link).then(done, function () { window.prompt("Copy this link:", link); });
        } else {
          window.prompt("Copy this link:", link);
        }
      });
    }
    updateShare();

    select.addEventListener("change", function () {
      var area = select.value;
      updateShare();
      if (!area) {
        resultWrap.style.display = "none";
        return;
      }
      var zoneKey = findZoneKey(area);
      var zone = ZONES[zoneKey];

      bfTimeEl.textContent = zone.bf;
      dinnerTimeEl.textContent = zone.dinner;

      var msg = "Hi, I'd like to ask if delivery to " + area + " could be earlier than the usual " + zone.bf + " breakfast/lunch slot. Kindly advise.";
      earlierBtn.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);

      resultWrap.style.display = "block";
    });

    /* Preselect from shared link, e.g. delivery-timings.html?area=Dubai%20Marina */
    try {
      var wanted = new URLSearchParams(window.location.search).get("area");
      if (wanted && findZoneKey(wanted)) {
        select.value = wanted;
        select.dispatchEvent(new Event("change"));
      }
    } catch (e) {}
  }

  renderOverview("zoneOverview");
  init("deliveryZonesWidget");
})();
