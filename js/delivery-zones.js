(function () {
  var ZONES = {
    "A": {
      "label": "Zone A",
      "bf": "Before 6:00 AM",
      "dinner": "Before 7:00 PM",
      "areas": [
        "Al Khail Gate",
        "Al Maktoum Airport Area",
        "Al Quoz",
        "Al Quoz Industrial Area",
        "Dubai Industrial City (DIC)",
        "Dubai Investment Park (DIP)",
        "Dubai Production City / IMPZ",
        "Dubai Science Park",
        "Dubai South",
        "Dubai Sports City",
        "Dubai Studio City",
        "Emaar South",
        "Green Community",
        "Jebel Ali",
        "Jebel Ali Village",
        "Jumeirah Golf Estates",
        "Motor City"
      ]
    },
    "B": {
      "label": "Zone B",
      "bf": "Before 7:30 AM",
      "dinner": "Before 8:30 PM",
      "areas": [
        "Downtown Dubai",
        "Dubai Internet City",
        "Dubai Knowledge Park",
        "Jumeirah Heights",
        "Jumeirah Park"
      ]
    },
    "C": {
      "label": "Zone C",
      "bf": "Before 7:00 AM",
      "dinner": "Before 8:00 PM",
      "areas": [
        "Al Mamzar",
        "Mina Rashid"
      ]
    },
    "D": {
      "label": "Zone D",
      "bf": "Before 7:00 AM",
      "dinner": "Before 7:00 PM",
      "areas": [
        "Al Twar",
        "Dubai Hills Estate",
        "Festival City",
        "MBR City",
        "Meydan",
        "Nad Al Hamar",
        "Reem",
        "Sobha Hartland",
        "The Gardens",
        "Wadi Al Safa"
      ]
    },
    "E": {
      "label": "Zone E",
      "bf": "Before 7:30 AM",
      "dinner": "Before 7:30 PM",
      "areas": [
        "Al Habtoor City"
      ]
    },
    "F": {
      "label": "Zone F",
      "bf": "Before 7:30 AM",
      "dinner": "Before 8:00 PM",
      "areas": [
        "The Valley"
      ]
    },
    "G": {
      "label": "Zone G",
      "bf": "Before 8:30 AM",
      "dinner": "Before 9:30 PM",
      "areas": [
        "Al Barsha South"
      ]
    },
    "H": {
      "label": "Zone H",
      "bf": "Before 7:00 AM",
      "dinner": "Before 7:30 PM",
      "areas": [
        "Abu Hail",
        "Academic City",
        "Al Baraha",
        "Al Barari",
        "Al Barsha",
        "Al Fahidi",
        "Al Furjan",
        "Al Garhoud",
        "Al Hamriya",
        "Al Jaddaf",
        "Al Jafliya",
        "Al Khawaneej",
        "Al Mankhool",
        "Al Mizhar",
        "Al Muraqqabat",
        "Al Muteena",
        "Al Nahda",
        "Al Qusais",
        "Al Qusais Industrial Area",
        "Al Raffa",
        "Al Ras",
        "Al Rashidiya",
        "Al Rigga",
        "Al Safa",
        "Al Souq Al Kabeer",
        "Al Warqa",
        "Al Wasl",
        "Arjan",
        "Barsha Heights (Tecom)",
        "Bur Dubai",
        "BurJuman",
        "Business Bay",
        "City Walk",
        "Culture Village",
        "DIFC",
        "Damac Hills",
        "Damac Hills 2",
        "Deira",
        "Discovery Gardens",
        "Dubai Harbour",
        "Dubai Healthcare City",
        "Dubai Land Residence Complex (DLRC)",
        "Dubai Marina",
        "Dubai Silicon Oasis",
        "Dubailand",
        "Hor Al Anz",
        "International City",
        "JBR",
        "JLT",
        "Jebel Ali Free Zone (JAFZA)",
        "Jumeirah",
        "Jumeirah Village Circle (JVC)",
        "Jumeirah Village Triangle (JVT)",
        "Karama",
        "La Mer",
        "Liwan",
        "Majan",
        "Mira",
        "Mirdif",
        "Muhaisnah",
        "Muhaisnah 2 (Sonapur)",
        "Nadd Al Sheba",
        "Naif",
        "Oud Metha",
        "Port Saeed",
        "Ras Al Khor",
        "Satwa",
        "Serena",
        "Umm Hurair",
        "Umm Ramool",
        "Umm Suqeim",
        "Villanova",
        "Warsan",
        "World Trade Centre (WTC)"
      ]
    }
  };;;

  var WHATSAPP_NUMBER = "971582871967";
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
