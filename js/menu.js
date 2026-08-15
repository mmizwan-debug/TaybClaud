(function () {
  var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var MEALS = ["Breakfast", "Lunch", "Dinner"];

  var state = {
    menu: "weekly", // "weekly" | "north"
    day: DAYS[0],
    meal: "Breakfast"
  };

  var dayTabsEl = document.getElementById("day-tabs");
  var mealTabsEl = document.getElementById("meal-tabs");
  var dishListEl = document.getElementById("dish-list");
  var dishCountEl = document.getElementById("dish-count");
  var toggleBtns = document.querySelectorAll(".menu-toggle-btn");

  function availableMealsForDay(day) {
    var source = state.menu === "weekly" ? WEEKLY_MENU : NORTH_INDIAN_MENU;
    var dayData = source[day] || {};
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

  function getCurrentDishes() {
    var source = state.menu === "weekly" ? WEEKLY_MENU : NORTH_INDIAN_MENU;
    var dayData = source[state.day] || {};
    var mealData = dayData[state.meal];
    if (!mealData) return { dishes: [], fallback: false };

    if (state.menu === "weekly") {
      return { dishes: mealData, fallback: false };
    }
    return { dishes: mealData.dishes || [], fallback: mealData.fallback || false };
  }

  function renderDishes() {
    var result = getCurrentDishes();
    var dishes = result.dishes;

    dishCountEl.textContent = dishes.length + (dishes.length === 1 ? " dish available" : " dishes available") + " · select your favourite";

    dishListEl.innerHTML = "";

    if (result.fallback) {
      var note = document.createElement("div");
      note.className = "fallback-note";
      note.textContent = "No North Indian breakfast dishes this day — South Indian favourites shown below.";
      dishListEl.appendChild(note);
    }

    if (dishes.length === 0) {
      var empty = document.createElement("p");
      empty.className = "empty-note";
      empty.textContent = "No dishes available for this selection.";
      dishListEl.appendChild(empty);
      return;
    }

    dishes.forEach(function (dish) {
      var card = document.createElement("div");
      card.className = "dish-card";

      var info = document.createElement("div");
      info.className = "dish-info";

      var name = document.createElement("h4");
      name.textContent = dish.name;

      var desc = document.createElement("p");
      desc.textContent = dish.desc;

      info.appendChild(name);
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
      var menuType = btn.getAttribute("data-menu");
      if (menuType === state.menu) return;
      state.menu = menuType;
      toggleBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      var meals = availableMealsForDay(state.day);
      if (meals.indexOf(state.meal) === -1) {
        state.meal = meals[0];
      }
      renderAll();
    });
  });

  renderAll();
})();
