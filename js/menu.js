(function () {
  var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var MEALS = ["Breakfast", "Lunch", "Dinner"];

  var STYLE_LABELS = {
    kerala: "Kerala",
    tamilnadu: "Tamil Nadu",
    south: "South Indian",
    north: "North Indian"
  };

  var state = {
    style: "kerala",
    vegOnly: false,
    day: DAYS[0],
    meal: "Breakfast"
  };

  var toggleBtns = document.querySelectorAll(".menu-toggle-btn");
  var vegToggleBtn = document.getElementById("vegToggle");
  var dayTabsEl = document.getElementById("day-tabs");
  var mealTabsEl = document.getElementById("meal-tabs");
  var dishListEl = document.getElementById("dish-list");
  var dishCountEl = document.getElementById("dish-count");

  function dishMatchesStyle(dish, style) {
    if (style === "south") {
      return dish.styles.indexOf("north") === -1;
    }
    return dish.styles.indexOf(style) !== -1;
  }

  function getFilteredDishes(day, meal) {
    var dayData = TAGGED_MENU[day] || {};
    var mealDishes = dayData[meal] || [];
    return mealDishes.filter(function (d) {
      var styleMatch = dishMatchesStyle(d, state.style);
      var vegMatch = !state.vegOnly || d.diet === "veg";
      return styleMatch && vegMatch;
    });
  }

  function availableMealsForDay(day) {
    var dayData = TAGGED_MENU[day] || {};
    return MEALS.filter(function (m) { return dayData.hasOwnProperty(m); });
  }

  function renderDayTabs() {
    dayTabsEl.innerHTML = "";
    DAYS.forEach(function (day) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "day-tab" + (day === state.day ? " active" : "");
      btn.textContent = day;
      btn.addEventListener("click", function () {
        state.day = day;
        var meals = availableMealsForDay(day);
        if (meals.indexOf(state.meal) === -1) {
          state.meal = meals[0];
        }
        renderAll();
      });
      dayTabsEl.appendChild(btn);
    });
  }

  function renderMealTabs() {
    mealTabsEl.innerHTML = "";
    var meals = availableMealsForDay(state.day);
    meals.forEach(function (meal) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "meal-tab" + (meal === state.meal ? " active" : "");
      btn.textContent = meal;
      btn.addEventListener("click", function () {
        state.meal = meal;
        renderAll();
      });
      mealTabsEl.appendChild(btn);
    });
  }

  function renderDishes() {
    var dishes = getFilteredDishes(state.day, state.meal);

    var styleLabel = STYLE_LABELS[state.style];
    var vegLabel = state.vegOnly ? " veg" : "";
    dishCountEl.textContent = dishes.length + (dishes.length === 1 ? " dish" : " dishes") +
      vegLabel + " available in " + styleLabel + " \u00b7 select your favourite";

    dishListEl.innerHTML = "";

    if (dishes.length === 0) {
      var empty = document.createElement("p");
      empty.className = "empty-note";
      empty.textContent = "No " + styleLabel + (state.vegOnly ? " veg" : "") + " dishes for this meal \u2014 try another style, day, or meal.";
      dishListEl.appendChild(empty);
      return;
    }

    dishes.forEach(function (dish) {
      var card = document.createElement("div");
      card.className = "dish-card";

      var info = document.createElement("div");
      info.className = "dish-info";

      var nameRow = document.createElement("div");
      nameRow.className = "dish-name-row";

      var name = document.createElement("h4");
      name.textContent = dish.name;

      var dietBadge = document.createElement("span");
      dietBadge.className = "diet-badge " + (dish.diet === "veg" ? "diet-veg" : "diet-nonveg");
      dietBadge.title = dish.diet === "veg" ? "Vegetarian" : "Non-Vegetarian";

      nameRow.appendChild(dietBadge);
      nameRow.appendChild(name);

      var desc = document.createElement("p");
      desc.textContent = dish.desc;

      info.appendChild(nameRow);
      info.appendChild(desc);

      var code = document.createElement("span");
      code.className = "dish-code";
      code.textContent = dish.code;

      card.appendChild(info);
      card.appendChild(code);
      dishListEl.appendChild(card);
    });
  }

  function renderAll() {
    renderDayTabs();
    renderMealTabs();
    renderDishes();
  }

  toggleBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var style = btn.getAttribute("data-style");
      if (style === state.style) return;
      state.style = style;
      toggleBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      renderAll();
    });
  });

  if (vegToggleBtn) {
    vegToggleBtn.addEventListener("click", function () {
      state.vegOnly = !state.vegOnly;
      vegToggleBtn.setAttribute("aria-pressed", String(state.vegOnly));
      vegToggleBtn.classList.toggle("active", state.vegOnly);
      renderAll();
    });
  }

  renderAll();
})();
