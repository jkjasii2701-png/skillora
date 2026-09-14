window.SkilloraStore = (function () {
  var KEY = "skillora-state-v1";

  function empty() {
    return {
      careerId: null,
      skills: {},
      hours: { Mon: 1, Tue: 1, Wed: 1, Thu: 1, Fri: 1, Sat: 2, Sun: 1 },
      schedule: null,
      history: []
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return empty();
      var data = JSON.parse(raw);
      return Object.assign(empty(), data);
    } catch (e) {
      return empty();
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function get() {
    return load();
  }

  function setCareer(careerId) {
    var state = load();
    if (state.careerId !== careerId) {
      state.careerId = careerId;
      state.skills = {};
      state.schedule = null;
      state.history = [];
    }
    save(state);
    return state;
  }

  function setSkills(skills) {
    var state = load();
    state.skills = skills;
    save(state);
    return state;
  }

  function setHours(hours) {
    var state = load();
    state.hours = hours;
    save(state);
    return state;
  }

  function setSchedule(schedule) {
    var state = load();
    state.schedule = schedule;
    save(state);
    return state;
  }

  function addSnapshot(snapshot) {
    var state = load();
    state.history = state.history || [];
    state.history.push(snapshot);
    save(state);
    return state;
  }

  return {
    get: get,
    setCareer: setCareer,
    setSkills: setSkills,
    setHours: setHours,
    setSchedule: setSchedule,
    addSnapshot: addSnapshot
  };
})();
