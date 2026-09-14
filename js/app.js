window.SkilloraApp = (function () {
  var Logic = window.SkilloraLogic;
  var Store = window.SkilloraStore;
  var Data = window.SkilloraData;
  var Charts = window.SkilloraCharts;

  function pageName() {
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (!file) return "index.html";
    return file;
  }

  function highlightNav() {
    var current = pageName();
    document.querySelectorAll("nav a").forEach(function (link) {
      var href = (link.getAttribute("href") || "").toLowerCase();
      if (href === current || (current === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  function career() {
    var state = Store.get();
    return Data.getCareer(state.careerId);
  }

  function requireCareer(container) {
    var selected = career();
    if (selected) return selected;
    container.innerHTML =
      '<div class="notice"><p>Choose a career on the Home page first.</p><p><a class="btn" href="index.html">Go to Home</a></p></div>';
    return null;
  }

  function requireSkills(container, selected) {
    var state = Store.get();
    if (state.skills && Object.keys(state.skills).length) return state;
    container.innerHTML =
      '<div class="notice"><p>Complete the skill test for ' +
      selected.name +
      ' before using this page.</p><p><a class="btn" href="tests.html">Go to Tests</a></p></div>';
    return null;
  }

  function collectAnswers(form, grouped) {
    var map = {};
    Object.keys(grouped).forEach(function (skillId) {
      map[skillId] = grouped[skillId].map(function (_, index) {
        var field = form.querySelector('input[name="' + skillId + "-" + index + '"]:checked');
        return field ? Number(field.value) : -1;
      });
    });
    return map;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderQuestions(container, grouped, careerObj) {
    var html = "";
    careerObj.skills.forEach(function (skill) {
      var list = grouped[skill.id] || [];
      list.forEach(function (item, index) {
        html += '<article class="question"><div class="skill-chip">' + escapeHtml(skill.name) + "</div>";
        html += "<h3>" + escapeHtml(item.q) + "</h3>";
        item.options.forEach(function (opt, optIndex) {
          var id = skill.id + "-" + index + "-" + optIndex;
          html += '<label class="choice" for="' + id + '">';
          html +=
            '<input id="' +
            id +
            '" type="radio" name="' +
            skill.id +
            "-" +
            index +
            '" value="' +
            optIndex +
            '" required> ';
          html += escapeHtml(opt) + "</label>";
        });
        html += "</article>";
      });
    });
    container.innerHTML = html;
  }

  function renderResults(container, skills, careerObj) {
    var cards = careerObj.skills
      .map(function (skill) {
        var data = skills[skill.id];
        return (
          '<article class="result-card"><h3>' +
          skill.name +
          "</h3><p class=\"muted\">" +
          data.correct +
          " / " +
          data.asked +
          " correct (" +
          data.percent +
          '%)</p><p class="level ' +
          data.level +
          '">' +
          Logic.levelLabel(data.level) +
          "</p></article>"
        );
      })
      .join("");
    container.innerHTML =
      "<h2>Your skill levels</h2><div class=\"results\">" +
      cards +
      '</div><div class="actions"><a class="btn" href="schedule.html">Build weekly schedule</a></div>';
  }

  function applyCareerQuery() {
    var params = new URLSearchParams(location.search);
    var id = params.get("career");
    if (id && Data.getCareer(id)) Store.setCareer(id);
  }

  function home() {
    var grid = document.getElementById("career-grid");
    if (!grid) return;
    grid.innerHTML = Data.careers
      .map(function (item) {
        return (
          '<a class="career-card" href="tests.html?career=' +
          encodeURIComponent(item.id) +
          '"><div class="career-icon">' +
          item.icon +
          "</div><h3>" +
          item.name +
          "</h3><p>" +
          item.blurb +
          "</p></a>"
        );
      })
      .join("");
    grid.addEventListener("click", function (event) {
      var card = event.target.closest(".career-card");
      if (!card) return;
      var id = card.getAttribute("href").split("career=")[1];
      if (id) Store.setCareer(decodeURIComponent(id));
    });
  }

  function tests() {
    applyCareerQuery();
    var root = document.getElementById("test-root");
    if (!root) return;
    var selected = requireCareer(root);
    if (!selected) return;
    document.getElementById("test-career").textContent = selected.name;
    var grouped = {};
    selected.skills.forEach(function (skill) {
      grouped[skill.id] = (Data.questions[skill.id] || []).slice();
    });
    var form = document.getElementById("test-form");
    var questionsBox = document.getElementById("questions");
    var resultsBox = document.getElementById("results");
    renderQuestions(questionsBox, grouped, selected);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var answers = collectAnswers(form, grouped);
      var skills = Logic.scoreTest(selected, grouped, answers);
      Store.setSkills(skills);
      Store.addSnapshot(Logic.snapshotFromSkills(selected.id, skills, "initial"));
      resultsBox.classList.remove("hidden");
      renderResults(resultsBox, skills, selected);
      resultsBox.scrollIntoView({ behavior: "smooth" });
    });
  }

  function schedule() {
    var root = document.getElementById("schedule-root");
    if (!root) return;
    var selected = requireCareer(root);
    if (!selected) return;
    var state = requireSkills(root, selected);
    if (!state) return;
    document.getElementById("schedule-career").textContent = selected.name;
    var form = document.getElementById("hours-form");
    var hoursBox = document.getElementById("hours-grid");
    hoursBox.innerHTML = Logic.DAYS.map(function (day) {
      var value = state.hours && state.hours[day] != null ? state.hours[day] : 1;
      return (
        "<label>" +
        day +
        ' <input type="number" min="0" max="8" step="0.5" name="' +
        day +
        '" value="' +
        value +
        '"></label>'
      );
    }).join("");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var hours = {};
      Logic.DAYS.forEach(function (day) {
        hours[day] = Number(form.elements[day].value) || 0;
      });
      Store.setHours(hours);
      var plan = Logic.buildSchedule(hours, state.skills, selected);
      Store.setSchedule(plan);
      renderPlan(plan);
    });
    if (state.schedule) renderPlan(state.schedule);
  }

  function renderPlan(plan) {
    var out = document.getElementById("week-plan");
    if (plan.error) {
      out.innerHTML = '<div class="notice">' + plan.error + "</div>";
      return;
    }
    var days = plan.days
      .map(function (day) {
        var slots = day.slots.length
          ? day.slots
              .map(function (slot) {
                return (
                  '<div class="slot"><strong>' +
                  slot.hours +
                  "h · " +
                  slot.name +
                  " · " +
                  Logic.levelLabel(slot.level) +
                  "</strong><div class=\"muted\">" +
                  slot.tip +
                  "</div></div>"
                );
              })
              .join("")
          : '<p class="muted">Rest / no free time</p>';
        return '<article class="day-card"><h3>' + day.day + " · " + day.hours + "h</h3>" + slots + "</article>";
      })
      .join("");
    out.innerHTML =
      "<h2>Your weekly study schedule</h2><p class=\"muted\">Weak skills get more time. Total: " +
      plan.total +
      ' hours.</p><div class="week">' +
      days +
      '</div><div class="actions"><a class="btn" href="monthly.html">Take monthly test</a></div>';
  }

  function monthly() {
    var root = document.getElementById("monthly-root");
    if (!root) return;
    var selected = requireCareer(root);
    if (!selected) return;
    var state = requireSkills(root, selected);
    if (!state) return;
    document.getElementById("monthly-career").textContent = selected.name;
    var grouped = Logic.pickMonthlyQuestions(selected, state.skills);
    var questionCount = Object.keys(grouped).reduce(function (acc, id) {
      return acc + (grouped[id] ? grouped[id].length : 0);
    }, 0);
    var form = document.getElementById("monthly-form");
    var questionsBox = document.getElementById("monthly-questions");
    if (!questionCount) {
      questionsBox.innerHTML = '<div class="notice">No monthly questions are available yet.</div>';
      form.querySelector("button[type=submit]").disabled = true;
      return;
    }
    var resultsBox = document.getElementById("monthly-results");
    renderQuestions(questionsBox, grouped, selected);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var answers = collectAnswers(form, grouped);
      var monthlySkills = Logic.scoreTest(selected, grouped, answers);
      var merged = Logic.mergeMonthly(state.skills, monthlySkills);
      Store.setSkills(merged);
      Store.addSnapshot(Logic.snapshotFromSkills(selected.id, merged, "monthly"));
      resultsBox.classList.remove("hidden");
      renderResults(resultsBox, merged, selected);
      var extra = document.createElement("div");
      extra.className = "actions";
      extra.innerHTML = '<a class="btn teal" href="dashboard.html">View dashboard</a>';
      resultsBox.appendChild(extra);
      resultsBox.scrollIntoView({ behavior: "smooth" });
    });
  }

  function dashboard() {
    var root = document.getElementById("dashboard-root");
    if (!root) return;
    var selected = requireCareer(root);
    if (!selected) return;
    var state = requireSkills(root, selected);
    if (!state) return;
    document.getElementById("dash-career").textContent = selected.name;
    document.getElementById("dash-average").textContent = Logic.averagePercent(state.skills) + "% overall";
    var levelBox = document.getElementById("dash-levels");
    levelBox.innerHTML = selected.skills
      .map(function (skill) {
        var data = state.skills[skill.id];
        return (
          '<article class="result-card"><h3>' +
          skill.name +
          '</h3><p class="muted">' +
          data.percent +
          '%</p><p class="level ' +
          data.level +
          '">' +
          Logic.levelLabel(data.level) +
          "</p></article>"
        );
      })
      .join("");
    Charts.drawBars(document.getElementById("bar-chart"), state.skills, selected);
    var careerHistory = (state.history || []).filter(function (snap) {
      return snap.careerId === selected.id;
    });
    Charts.drawLine(document.getElementById("line-chart"), careerHistory);
    var first = careerHistory[0];
    var latest = careerHistory[careerHistory.length - 1];
    var list = document.getElementById("improve-list");
    if (!first || !latest) {
      list.innerHTML = "<li>Complete a test to track improvement.</li>";
      return;
    }
    list.innerHTML = selected.skills
      .map(function (skill) {
        var a = (first.skills[skill.id] && first.skills[skill.id].percent) || 0;
        var b = (latest.skills[skill.id] && latest.skills[skill.id].percent) || 0;
        var diff = b - a;
        var sign = diff > 0 ? "+" : "";
        return "<li><strong>" + skill.name + ":</strong> " + a + "% → " + b + "% (" + sign + diff + "%)</li>";
      })
      .join("");
  }

  function init() {
    highlightNav();
    var page = pageName();
    if (page === "index.html" || page === "") home();
    if (page === "tests.html") tests();
    if (page === "schedule.html") schedule();
    if (page === "monthly.html") monthly();
    if (page === "dashboard.html") dashboard();
  }

  return { init: init };
})();

document.addEventListener("DOMContentLoaded", window.SkilloraApp.init);
