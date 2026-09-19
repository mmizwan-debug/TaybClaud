(function () {
  /* ===================== DATA ===================== */
  /* Same structure/format as provided: category -> days -> meals[{label,dish,vnv,code,sub}], plus addon */
  const FIXED_MENU = {
    kerala: {
      label: "Kerala",
      days: [
        { name: "Monday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Puttu + Black Channa Curry", vnv: "Veg", code: "B02-M" },
          { label: "Lunch", dish: "Matta Rice, Fish Curry, Chicken Curry, Sambar, Rasam, Fried Fish & Chicken 65, Papadam, Pickle", vnv: "Non-Veg", code: "L04-M" },
          { label: "Dinner", dish: "Malabar Parota + Beef Curry", vnv: "Non-Veg", code: "D05-M" }
        ]},
        { name: "Tuesday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Idiyappam + Aloo Curry", vnv: "Veg", code: "B01-TH" },
          { label: "Lunch", dish: "Matta Rice, Fish Curry, Chicken Curry, Thayir Curry, Rasam, Fried Fish & Chicken 65, Papadam, Pickle", vnv: "Non-Veg", code: "L04-T" },
          { label: "Dinner", dish: "Idiyappam + Kerala-style Chicken Curry", vnv: "Non-Veg", code: "D14-T" }
        ]},
        { name: "Wednesday", tag: "Veg Day", meals: [
          { label: "Breakfast", dish: "Malabar Parota + Channa Kuruma", vnv: "Veg", code: "B09-M" },
          { label: "Lunch", dish: "Kerala Special Matta Rice, Sambar, Kootu Curry, Rasam", vnv: "Veg", code: "L03-W" },
          { label: "Dinner", dish: "Wheat Puttu + Cherupayar Curry", vnv: "Veg", code: "B02-F" }
        ]},
        { name: "Thursday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Upumavu + Kadala Curry", vnv: "Veg", code: "B10-F" },
          { label: "Lunch", dish: "Matta Rice, Fish Curry, Chicken Curry, Thayir Curry, Rasam, Fried Fish & Chicken 65, Papadam, Pickle", vnv: "Non-Veg", code: "L04-TH" },
          { label: "Dinner", dish: "Neychoru Beef - Kerala Ghee Rice + Beef Curry + Pickle", vnv: "Non-Veg", code: "D11-M" }
        ]},
        { name: "Friday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Wheat Puttu + Cherupayar Curry", vnv: "Veg", code: "B02-F" },
          { label: "Lunch", dish: "Matta Rice, Fish Curry, Chicken Curry, Sambar, Rasam, Fried Fish & Chicken 65, Papadam, Pickle", vnv: "Non-Veg", code: "L04-F" },
          { label: "Dinner", dish: "Malabar Parota + Kerala-style Egg Curry", vnv: "Non-Veg", code: "D05-F" }
        ]},
        { name: "Saturday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Idiyappam + Green Peas Curry", vnv: "Veg", code: "B02-SA" },
          { label: "Lunch", dish: "Fish Biriyani - Neymeen, Traditional Kerala Spices, Raita", vnv: "Non-Veg", code: "L07-SA" },
          { label: "Dinner", dish: "Kasargod-style Chicken Curry + Choru", vnv: "Non-Veg", code: "D11-F" }
        ]}
      ],
      addon: null
    },

    southindian: {
      label: "South Indian",
      days: [
        { name: "Monday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Idly Set", vnv: "Veg", code: "B01-W", sub: "Soft steamed idlys with sambar and chutney" },
          { label: "Lunch", dish: "Veg Meal", vnv: "Veg", code: "L01-M", sub: "Baric rice with sambar, poricha/puli kulambu, vathakuzhambu, rasam, and kootu" },
          { label: "Dinner", dish: "Chicken Biriyani", vnv: "Non-Veg", code: "D09-M", sub: "Basmati rice layered with tender chicken, slow-cooked on dum, served with raita and pickle" }
        ]},
        { name: "Tuesday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Dosa", vnv: "Veg", code: "B02-T", sub: "Tawa-style dosa with sambar and fresh chutney" },
          { label: "Lunch", dish: "Chicken Biriyani", vnv: "Non-Veg", code: "L08-T", sub: "Seeraga Samba rice cooked with tender chicken and traditional spices" },
          { label: "Dinner", dish: "Mutton Chukka Rice Combo", vnv: "Non-Veg", code: "D08-TH", sub: "Baric rice with spicy mutton chukka masala and a boiled egg" }
        ]},
        { name: "Wednesday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Chicken Sandwich", vnv: "Non-Veg", code: "B09-W", sub: "3-layer white bread sandwich with minced chicken and vegetables" },
          { label: "Lunch", dish: "Curd Rice", vnv: "Veg", code: "L05-T", sub: "South Indian curd rice with creamy yogurt, tempered with potato fry" },
          { label: "Dinner", dish: "Chicken Burger", vnv: "Non-Veg", code: "D15-T", sub: "Juicy chicken patty in a soft bun with sauces" }
        ]},
        { name: "Thursday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Pongal Sambar", vnv: "Veg", code: "B03-W", sub: "Soft creamy pongal with traditional spicy gothsu" },
          { label: "Lunch", dish: "Non-Veg Meal", vnv: "Non-Veg", code: "L02-TH", sub: "Baric rice with fish curry, mutton curry, sambar, rasam, and crispy fried fish" },
          { label: "Dinner", dish: "Dosa with Mutton Salna", vnv: "Non-Veg", code: "D07-SA", sub: "Golden tawa-style dosa paired with tender mutton salna" }
        ]},
        { name: "Friday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Spicy Beef Fusion Wrap", vnv: "Non-Veg", code: "B05-T", sub: "Flaky parotta with omelet, spiced beef, and fresh carrot mayo" },
          { label: "Lunch", dish: "Lemon Rice", vnv: "Veg", code: "L05-F", sub: "Tangy rice seasoned with turmeric, mustard seeds, curry leaves, and fresh lemon" },
          { label: "Dinner", dish: "Ghee Rice with Pepper Chicken Gravy", vnv: "Non-Veg", code: "D16-W", sub: "Fragrant ghee rice with rich pepper chicken gravy" }
        ]},
        { name: "Saturday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Chicken Burger", vnv: "Non-Veg", code: "B09-T", sub: "Juicy chicken patty in a soft bun with sauces" },
          { label: "Lunch", dish: "Ghee Rice", vnv: "Non-Veg", code: "L14-W", sub: "Fragrant ghee rice with chicken chukka" },
          { label: "Dinner", dish: "Rice Non-Veg Combo", vnv: "Non-Veg", code: "D17-F", sub: "Steamed basmati rice with chicken chukka masala and boiled egg" }
        ]}
      ],
      addon: "Sunday (optional add-on): <strong>Lunch only — AED 30/month</strong> — Chicken Biriyani (L08-T, same as Tuesday's lunch). <strong>Lunch + Dinner — AED 50/month</strong> — also adds Dosa with Mutton Salna (D07-SA, same as Thursday's dinner)."
    },

    northindian: {
      label: "North Indian",
      days: [
        { name: "Monday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Chappathi", vnv: "Veg", code: "B04-M", sub: "Set of whole wheat chapathis served with North-style chickpeas kuruma" },
          { label: "Lunch", dish: "Chicken Biriyani", vnv: "Non-Veg", code: "L09-M", sub: "Aromatic basmati rice layered with tender chicken and slow-cooked on dum with rich spices, served with raita and pickle" },
          { label: "Dinner", dish: "Parota Non-Veg", vnv: "Non-Veg", code: "D04-M", sub: "Flaky parota served with tender chicken cooked in a rich and spicy salna gravy" }
        ]},
        { name: "Tuesday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Poori", vnv: "Veg", code: "B03-T", sub: "Set of soft poori served with spiced potato and peas kurma" },
          { label: "Lunch", dish: "Basumathi Veg Combo", vnv: "Veg", code: "L10-T", sub: "Aromatic basmati rice accompanied by creamy muttor paneer and homestyle dal curry with single chappathi" },
          { label: "Dinner", dish: "White Mutton Biriyani", vnv: "Non-Veg", code: "D05-T", sub: "Fragrant biriyani cooked with tender white mutton, served with refreshing green chilli, mint, and coriander raita" }
        ]},
        { name: "Wednesday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Poori", vnv: "Veg", code: "B04-W", sub: "Set of soft poori served with spiced white channa chole bature" },
          { label: "Lunch", dish: "Chicken Biriyani", vnv: "Non-Veg", code: "L08-W", sub: "Aromatic basmati rice layered with tender chicken, cooked in traditional Hyderabadi dum style, served with raita" },
          { label: "Dinner", dish: "Chappathi Non-Veg", vnv: "Non-Veg", code: "D02-W", sub: "Soft whole wheat chappathis accompanied by tender chicken aloo curry" }
        ]},
        { name: "Thursday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Idly Set", vnv: "Veg", code: "B02-TH", sub: "Soft, steamed idlys served with homestyle sambar (South Indian favourite — no North Indian breakfast this day)" },
          { label: "Lunch", dish: "Veg Biriyani", vnv: "Veg", code: "L07-TH", sub: "Aromatic basmati rice cooked with a selection of fresh vegetables and traditional spices, served with raita" },
          { label: "Dinner", dish: "Beef Biriyai", vnv: "Non-Veg", code: "D09-TH", sub: "Aromatic basmati rice layered with tender beef and slow-cooked on dum with rich spices, served with raita and pickle" }
        ]},
        { name: "Friday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Dosa Set", vnv: "Veg", code: "B05-F", sub: "Kerala dosa platter, served with sambar & mulaku chutney (South Indian favourite — no North Indian breakfast this day)" },
          { label: "Lunch", dish: "Vadi Biriyani", vnv: "Non-Veg", code: "L08-F", sub: "Fragrant basmati rice layered with tender chicken, prepared in traditional style, served with raita" },
          { label: "Dinner", dish: "Chappathi Non-Veg", vnv: "Non-Veg", code: "D02-F", sub: "Soft whole wheat chappathis accompanied by butter chicken" }
        ]},
        { name: "Saturday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Chappathi", vnv: "Veg", code: "B03-SA", sub: "Set of whole wheat chapathis served with North-style channa curry" },
          { label: "Lunch", dish: "Veg Biriyani", vnv: "Veg", code: "L11-SA", sub: "Aromatic basmati rice cooked with a selection of fresh vegetables and traditional spices, served with raita" },
          { label: "Dinner", dish: "White Mutton Biriyani", vnv: "Non-Veg", code: "D05-SA", sub: "Fragrant biriyani cooked with tender white mutton, served with refreshing green chilli, mint, and coriander raita" }
        ]}
      ],
      addon: "Sunday (optional add-on): choose either <strong>Chicken Biriyai (LD01-SU)</strong> — tender chicken basmati biriyani with raita and pickle, or <strong>Veg Biriyani (LD04-SU)</strong> — basmati rice with fresh vegetables and raita. Same two options cover both lunch and dinner."
    }
  };

  /* ===================== STATE ===================== */
  var VALID_CATEGORIES = Object.keys(FIXED_MENU);
  var DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function getUrlParams() {
    return new URLSearchParams(window.location.search);
  }

  function initialModeFromUrl() {
    return getUrlParams().get("mode") === "fixed" ? "fixed" : "custom";
  }

  function initialCategoryFromUrl() {
    var cat = getUrlParams().get("category");
    return VALID_CATEGORIES.indexOf(cat) !== -1 ? cat : "kerala";
  }

  function initialFixedDayIndexFromUrl() {
    var day = getUrlParams().get("day");
    for (var i = 0; i < DAY_NAMES.length; i++) {
      if (DAY_NAMES[i].toLowerCase() === (day || "").toLowerCase()) return i;
    }
    return 0;
  }

  var currentMode = initialModeFromUrl();

  const fixedState = {
    category: initialCategoryFromUrl(),
    dayIndex: initialFixedDayIndexFromUrl()
  };

  function updateFixedUrl() {
    const params = getUrlParams();
    if (currentMode === "fixed") {
      params.set("mode", "fixed");
      params.set("category", fixedState.category);
      const day = FIXED_MENU[fixedState.category].days[fixedState.dayIndex];
      if (day && day.name !== DAY_NAMES[0]) {
        params.set("day", day.name);
      } else {
        params.delete("day");
      }
    } else {
      params.delete("mode");
      params.delete("category");
      params.delete("day");
    }
    const qs = params.toString();
    const newUrl = window.location.pathname + (qs ? "?" + qs : "");
    window.history.replaceState(null, "", newUrl);
  }

  const customSection = document.getElementById("customMenuSection");
  const fixedSection = document.getElementById("fixedMenuSection");
  const modeButtons = document.querySelectorAll(".mode-toggle-btn");
  const categoryBar = document.getElementById("fixedCategoryBar");
  const dayBar = document.getElementById("fixedDayBar");
  const planWrap = document.getElementById("fixedPlanWrap");
  const addonWrap = document.getElementById("fixedAddonWrap");

  if (!fixedSection) return;

  /* ===================== MODE SWITCH ===================== */
  function activateMode(mode) {
    currentMode = mode;
    modeButtons.forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-mode") === mode);
    });
    if (mode === "fixed") {
      customSection.style.display = "none";
      fixedSection.style.display = "block";
      renderFixedAll();
    } else {
      fixedSection.style.display = "none";
      customSection.style.display = "block";
      updateFixedUrl();
    }
  }

  modeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const mode = btn.getAttribute("data-mode");
      activateMode(mode);
    });
  });

  /* ===================== RENDER ===================== */
  function renderCategoryBar() {
    categoryBar.innerHTML = "";
    Object.keys(FIXED_MENU).forEach(function (key) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "menu-toggle-btn" + (key === fixedState.category ? " active" : "");
      btn.textContent = FIXED_MENU[key].label;
      btn.addEventListener("click", function () {
        fixedState.category = key;
        fixedState.dayIndex = 0;
        renderFixedAll();
      });
      categoryBar.appendChild(btn);
    });
  }

  function renderDayBar() {
    dayBar.innerHTML = "";
    const cat = FIXED_MENU[fixedState.category];
    cat.days.forEach(function (d, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "day-tab" + (i === fixedState.dayIndex ? " active" : "");
      btn.textContent = d.name;
      btn.addEventListener("click", function () {
        fixedState.dayIndex = i;
        renderPlan();
        renderDayBar();
        updateFixedUrl();
      });
      dayBar.appendChild(btn);
    });
  }

  function mealCardHTML(m) {
    const dietClass = m.vnv === "Veg" ? "diet-veg" : "diet-nonveg";
    const sub = m.sub ? '<p>' + m.sub + '</p>' : '<p style="font-style:italic;color:#aaa;">Full description available at registration.</p>';
    return (
      '<div class="dish-card">' +
        '<div class="dish-info">' +
          '<div class="dish-name-row">' +
            '<span class="diet-badge ' + dietClass + '" title="' + m.vnv + '"></span>' +
            '<h4>' + m.label + ': ' + m.dish + '</h4>' +
          '</div>' +
          sub +
        '</div>' +
        '<span class="dish-code">' + m.code + '</span>' +
      '</div>'
    );
  }

  function renderPlan() {
    const cat = FIXED_MENU[fixedState.category];
    const day = cat.days[fixedState.dayIndex];

    let html = '<p class="dish-count">' + day.name + ' \u2014 ' + day.tag + '</p>';
    html += '<div class="dish-list">' + day.meals.map(mealCardHTML).join("") + '</div>';
    planWrap.innerHTML = html;

    addonWrap.innerHTML = cat.addon
      ? '<div class="fallback-note">' + cat.addon + '</div>'
      : '';
  }

  function renderFixedAll() {
    renderCategoryBar();
    renderDayBar();
    renderPlan();
    updateFixedUrl();
  }

  if (currentMode === "fixed") {
    activateMode("fixed");
  }
})();
