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

    select.addEventListener("change", function () {
      var area = select.value;
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
  }

  init("deliveryZonesWidget");
})();
