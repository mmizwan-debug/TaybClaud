(function () {
  /* ===================== DATA ===================== */
  /* Same structure/format as provided: category -> days -> meals[{label,dish,vnv,code,sub}], plus addon */
  const FIXED_MENU = {
    kerala: {
      label: "Kerala",
      days: [
        { name: "Monday", tag: "Veg Day", meals: [
          { label: "Breakfast", dish: "Kerala Style Breakfast Combo", vnv: "Veg", code: "B02-M", sub: "Puttu, parota, payasam served with kadala curry & sambar" },
          { label: "Lunch", dish: "Veg Meal", vnv: "Veg", code: "L03-M", sub: "Kerala special matta rice served with homely sambar, kootu curry, flavorful rasam, and appalam" },
          { label: "Dinner", dish: "Neychoru Beef", vnv: "Non-Veg", code: "D11-M", sub: "Traditional Kerala ghee rice (Neychoru) served with rich beef curry and tangy pickle" }
        ]},
        { name: "Tuesday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Upma", vnv: "Non-Veg", code: "B01-T", sub: "Homestyle upma served with egg masala" },
          { label: "Lunch", dish: "Neychoru Beef", vnv: "Non-Veg", code: "L09-T", sub: "Traditional Kerala ghee rice (Neychoru) served with rich beef curry and tangy pickle" },
          { label: "Dinner", dish: "White Mutton Biryani", vnv: "Non-Veg", code: "D05-T", sub: "Fragrant biryani cooked with tender white mutton, served with refreshing green chilli, mint, and coriander raita" }
        ]},
        { name: "Wednesday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Uppumavu", vnv: "Non-Veg", code: "B06-W", sub: "Soft, traditional Kerala uppumavu served with rich coconut-based egg masala" },
          { label: "Lunch", dish: "Vegetable Biryani / Veg Pulav with Curd", vnv: "Veg", code: "L05-W", sub: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices, served with refreshing curd" },
          { label: "Dinner", dish: "Kerala Chicken Stew with Steamed Rice", vnv: "Non-Veg", code: "D08-W", sub: "Tender chicken in mild coconut gravy, served with steamed rice" }
        ]},
        { name: "Thursday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Idiyappam", vnv: "Veg", code: "B01-TH", sub: "Set of soft, steamed idiyappam served with vegetable stew / aloo curry" },
          { label: "Lunch", dish: "Kannur Chicken Biriyani", vnv: "Non-Veg", code: "L06-TH", sub: "Chicken biriyani layered with tender chicken, slow-cooked in authentic Kannur-style dum biryani spices, served with raita" },
          { label: "Dinner", dish: "Fish Biryani", vnv: "Non-Veg", code: "D10-TH", sub: "Special ghee rice served with Kerala-style fried fish biryani, cooked with traditional spices and accompanied by raita" }
        ]},
        { name: "Friday", tag: "Veg Day", meals: [
          { label: "Breakfast", dish: "Kerala Dosa Platter", vnv: "Veg", code: "B05-F", sub: "Served with sambar & chutney" },
          { label: "Lunch", dish: "Tomato Rice", vnv: "Veg", code: "L05-F", sub: "Flavorful tomato rice served with raita" },
          { label: "Dinner", dish: "Special Kasargod Chicken Choru", vnv: "Non-Veg", code: "D11-F", sub: "Traditional flavorful Kasargod-style chicken curry served with choru" }
        ]},
        { name: "Saturday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Parotta", vnv: "Non-Veg", code: "B04-SA", sub: "2 pieces of Malabar parotta served with flavorful Kerala-style palli beef curry" },
          { label: "Lunch", dish: "Fish Biryani", vnv: "Non-Veg", code: "L07-SA", sub: "Rice layered with succulent neymeen, cooked in traditional Kerala spices and served with raita" },
          { label: "Dinner", dish: "Nadan Chicken Curry with Neychoru", vnv: "Non-Veg", code: "D11-SA", sub: "Kerala-style country chicken curry served with flavorful Neychoru" }
        ]}
      ],
      addon: "Sunday (optional add-on): <strong>Lunch only \u2014 AED 30/month</strong> \u2014 Chicken Biriyani, Thalassery-style (LD02-SU). <strong>Lunch + Dinner \u2014 AED 50/month</strong> \u2014 also adds Beef Biriyani (LD03-SU)."
    },

    southindian: {
      label: "South Indian",
      days: [
        { name: "Monday", tag: "Veg Day", meals: [
          { label: "Breakfast", dish: "Idly Set", vnv: "Veg", code: "B01-M", sub: "Soft, steamed set of 3 idlys served with mildly spiced kadappa" },
          { label: "Lunch", dish: "Lunch Box", vnv: "Veg", code: "L06-M", sub: "Combo of tamarind rice, tomato rice, and curd rice served with vada" },
          { label: "Dinner", dish: "Chicken Biriyani", vnv: "Non-Veg", code: "D09-M", sub: "Aromatic basmati rice layered with tender chicken and slow-cooked on dum with rich spices, served with raita and pickle" }
        ]},
        { name: "Tuesday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Beef Wrap", vnv: "Non-Veg", code: "B05-T", sub: "Soft flaky parotta loaded with omelet, spiced beef, and fresh carrot mayo, served with ketchup and green chutney" },
          { label: "Lunch", dish: "Baric Fish Meals", vnv: "Non-Veg", code: "L02-T", sub: "Baric rice accompanied by traditional fish curry, sambar & aromatic rasam, appalam, and fish fry" },
          { label: "Dinner", dish: "White Mutton Biryani", vnv: "Non-Veg", code: "D05-T", sub: "Fragrant biryani cooked with tender white mutton, served with refreshing green chilli, mint, and coriander raita" }
        ]},
        { name: "Wednesday", tag: "Veg Day", meals: [
          { label: "Breakfast", dish: "Pongal Sambar", vnv: "Veg", code: "B03-W", sub: "Soft, creamy pongal served with traditional spicy gothsu" },
          { label: "Lunch", dish: "Veg Meal", vnv: "Veg", code: "L01-W", sub: "Steamed rice served with homestyle sambar, poricha kulambu / puli kulambu / vathakuzhambu, flavorful rasam, kootu and appalam" },
          { label: "Dinner", dish: "Rice Non-Veg Combo", vnv: "Non-Veg", code: "D17-W", sub: "Steamed basmati rice served with traditional sambar and spicy chicken chukka masala" }
        ]},
        { name: "Thursday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Club Sandwich", vnv: "Non-Veg", code: "B04-TH", sub: "3-layer white bread sandwich stuffed with sliced chicken, egg and vegetables" },
          { label: "Lunch", dish: "Kannur Chicken Biriyani", vnv: "Non-Veg", code: "L06-TH", sub: "Chicken biriyani layered with tender chicken, slow-cooked in authentic Kannur-style dum biryani spices, served with raita" },
          { label: "Dinner", dish: "Fish Biryani", vnv: "Non-Veg", code: "D10-TH", sub: "Special ghee rice served with Kerala-style fried fish biryani, cooked with traditional spices and accompanied by raita" }
        ]},
        { name: "Friday", tag: "Veg Day", meals: [
          { label: "Breakfast", dish: "Idiyappam", vnv: "Veg", code: "B08-F", sub: "Set of soft, steamed idiyappam served with veg stew" },
          { label: "Lunch", dish: "Veg Meal", vnv: "Veg", code: "L01-F", sub: "Baric rice served with homely kara kuzhambu and appalam" },
          { label: "Dinner", dish: "Special Kasargod Chicken Choru", vnv: "Non-Veg", code: "D11-F", sub: "Traditional flavorful Kasargod-style chicken curry served with choru" }
        ]},
        { name: "Saturday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Chicken Sandwich", vnv: "Non-Veg", code: "B05-SA", sub: "White bread sandwich stuffed with minced chicken and vegetables" },
          { label: "Lunch", dish: "Neychoru", vnv: "Non-Veg", code: "L08-SA", sub: "Fragrant Kerala-style Neychoru served with rich and flavorful chicken perattu" },
          { label: "Dinner", dish: "Chicken Biryani (Ambur Style)", vnv: "Non-Veg", code: "D05-SA", sub: "Fragrant Seeraga Samba rice cooked with tender chicken and aromatic spices" }
        ]}
      ],
      addon: "Sunday (optional add-on): <strong>Lunch only \u2014 AED 30/month</strong> \u2014 Chicken Biriyani (LD01-SU). <strong>Lunch + Dinner \u2014 AED 50/month</strong> \u2014 also adds Beef Biriyani (LD03-SU)."
    },

    northindian: {
      label: "North Indian",
      days: [
        { name: "Monday", tag: "Non-Veg Day", meals: [
          { label: "Breakfast", dish: "Chappathi", vnv: "Non-Veg", code: "B04-M", sub: "Set of whole wheat chapathis served with chicken curry/masala" },
          { label: "Lunch", dish: "Chappathi with Chicken Curry & Chicken 65", vnv: "Non-Veg", code: "L12-M", sub: "Served with chicken curry & chicken 65" },
          { label: "Dinner", dish: "Butter Chicken", vnv: "Non-Veg", code: "D19-M", sub: "Flavorful butter chicken served with steamed rice" }
        ]},
        { name: "Tuesday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Chappathi", vnv: "Veg", code: "B04-T", sub: "A set of soft, fluffy chappathis served with delicious bhaji" },
          { label: "Lunch", dish: "Chappathi with Chicken", vnv: "Non-Veg", code: "L15-T", sub: "Soft, fluffy chappathis served with flavorful chicken curry and crispy Chicken 65" },
          { label: "Dinner", dish: "Chappathi with Spiced Egg Curry", vnv: "Non-Veg", code: "D02-T", sub: "Soft whole wheat chappathis accompanied by spiced egg curry" }
        ]},
        { name: "Wednesday", tag: "Veg Day", meals: [
          { label: "Breakfast", dish: "Poori", vnv: "Veg", code: "B04-W", sub: "Set of soft poori served with spiced white channa chole bature" },
          { label: "Lunch", dish: "Chappathi with Chole Curry", vnv: "Veg", code: "L07-W", sub: "Soft whole-wheat chappathis served with homestyle spiced chickpea (chole) curry" },
          { label: "Dinner", dish: "Beef Pulao", vnv: "Non-Veg", code: "D18-W", sub: "Fragrant beef pulao cooked in aromatic Yakhni spices, served with spiced potato and chickpeas" }
        ]},
        { name: "Thursday", tag: "Veg Day", meals: [
          { label: "Breakfast", dish: "Idly Set", vnv: "Veg", code: "B02-TH", sub: "Soft, steamed idlys served with homestyle sambar (South Indian favourite \u2014 no North Indian breakfast this day)" },
          { label: "Lunch", dish: "Basmati Veg Combo", vnv: "Veg", code: "L10-TH", sub: "Aromatic basmati rice accompanied by veg kuruma / paneer / green peas" },
          { label: "Dinner", dish: "Chappathi with Chicken Aloo Curry", vnv: "Non-Veg", code: "D02-W", sub: "Soft whole wheat chappathis accompanied by tender chicken aloo curry" }
        ]},
        { name: "Friday", tag: "Veg Day", meals: [
          { label: "Breakfast", dish: "Idly Set", vnv: "Veg", code: "B01-F", sub: "Soft, steamed set of 3 idlys served with homestyle sambar (South Indian favourite \u2014 no North Indian breakfast this day)" },
          { label: "Lunch", dish: "Chappathi Lunch", vnv: "Veg", code: "L07-F", sub: "Set of whole wheat chapathis served with flavorful vegetable chunks masala" },
          { label: "Dinner", dish: "Chappathi with Spiced Egg Gravy", vnv: "Non-Veg", code: "D02-TH", sub: "Soft whole wheat chappathis accompanied by spiced egg gravy" }
        ]},
        { name: "Saturday", tag: "Mixed Day", meals: [
          { label: "Breakfast", dish: "Chappathi", vnv: "Veg", code: "B03-SA", sub: "Set of whole wheat chapathis served with North-style channa curry" },
          { label: "Lunch", dish: "Chicken Biryani", vnv: "Non-Veg", code: "L09-SA", sub: "Aromatic basmati rice layered with tender chicken, cooked in traditional Hyderabadi dum style, served with raita" },
          { label: "Dinner", dish: "Butter Chicken with Rice", vnv: "Non-Veg", code: "D08-SA", sub: "Butter chicken served with steamed rice" }
        ]}
      ],
      addon: "Sunday (optional add-on): choose either <strong>Chicken Biriyai (LD01-SU)</strong> \u2014 tender chicken basmati biriyani with raita and pickle, or <strong>Veg Biriyani (LD04-SU)</strong> \u2014 basmati rice with fresh vegetables and raita. Same two options cover both lunch and dinner."
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
