window.SkilloraLogic = (function () {
  var DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var WEIGHTS = { weak: 3, average: 2, good: 1 };

  function levelFromPercent(percent) {
    if (percent < 50) return "weak";
    if (percent < 75) return "average";
    return "good";
  }

  function levelLabel(level) {
    if (level === "weak") return "Weak 🔴";
    if (level === "average") return "Average 🟡";
    return "Good 🟢";
  }

  function roundHalf(n) {
    return Math.round(n * 2) / 2;
  }

  function scoreAnswers(questions, answers) {
    var correct = 0;
    var asked = 0;
    questions.forEach(function (item, i) {
      asked += 1;
      if (Number(answers[i]) === item.answer) correct += 1;
    });
    var percent = asked === 0 ? 0 : Math.round((correct / asked) * 100);
    return {
      correct: correct,
      asked: asked,
      percent: percent,
      level: levelFromPercent(percent)
    };
  }

  function scoreTest(career, groupedQuestions, answerMap) {
    var skills = {};
    career.skills.forEach(function (skill) {
      var qs = groupedQuestions[skill.id] || [];
      var answers = (answerMap[skill.id] || []).slice(0, qs.length);
      skills[skill.id] = Object.assign({ name: skill.name }, scoreAnswers(qs, answers));
    });
    return skills;
  }

  function mergeMonthly(previousSkills, monthlySkills) {
    var next = {};
    Object.keys(previousSkills || {}).forEach(function (id) {
      next[id] = Object.assign({}, previousSkills[id]);
    });
    Object.keys(monthlySkills || {}).forEach(function (id) {
      var result = monthlySkills[id];
      if (!result || !result.asked) return;
      next[id] = {
        name: result.name || (previousSkills[id] && previousSkills[id].name),
        correct: result.correct,
        asked: result.asked,
        percent: result.percent,
        level: result.level
      };
    });
    return next;
  }

  function snapshotFromSkills(careerId, skills, source) {
    var copy = {};
    Object.keys(skills).forEach(function (id) {
      copy[id] = {
        percent: skills[id].percent,
        level: skills[id].level,
        name: skills[id].name
      };
    });
    return {
      date: new Date().toISOString(),
      careerId: careerId,
      source: source,
      skills: copy
    };
  }

  function pickMonthlyQuestions(career, skills) {
    var grouped = {};
    var planned = career.skills.map(function (skill) {
      var level = (skills[skill.id] && skills[skill.id].level) || "weak";
      var count = 0;
      if (level === "weak") count = 2;
      else if (level === "average") count = 1;
      return { skill: skill, count: count };
    });
    var total = planned.reduce(function (acc, item) {
      return acc + item.count;
    }, 0);
    if (total === 0) {
      planned = career.skills.map(function (skill) {
        return { skill: skill, count: 1 };
      });
    }
    planned.forEach(function (item) {
      var bank = (window.SkilloraData.monthlyQuestions[item.skill.id] || []).slice();
      var extra = window.SkilloraData.questions[item.skill.id] || [];
      grouped[item.skill.id] = bank.concat(extra).slice(0, item.count);
    });
    return grouped;
  }

  function allocateHours(total, skills, career) {
    var weights = career.skills.map(function (skill) {
      var level = (skills[skill.id] && skills[skill.id].level) || "weak";
      return { skill: skill, weight: WEIGHTS[level], level: level };
    });
    var sum = weights.reduce(function (acc, w) {
      return acc + w.weight;
    }, 0);
    var raw = weights.map(function (w) {
      return { skill: w.skill, level: w.level, hours: total * (w.weight / sum) };
    });
    var rounded = raw.map(function (r) {
      return { skill: r.skill, level: r.level, hours: roundHalf(r.hours) };
    });
    var roundedSum = rounded.reduce(function (acc, r) {
      return acc + r.hours;
    }, 0);
    var diff = roundHalf(total - roundedSum);
    if (diff !== 0 && rounded.length) {
      rounded.sort(function (a, b) {
        return WEIGHTS[b.level] - WEIGHTS[a.level];
      });
      rounded[0].hours = Math.max(0, roundHalf(rounded[0].hours + diff));
    }
    return rounded.sort(function (a, b) {
      return WEIGHTS[b.level] - WEIGHTS[a.level];
    });
  }

  function buildSchedule(hours, skills, career) {
    var total = DAYS.reduce(function (acc, day) {
      return acc + (Number(hours[day]) || 0);
    }, 0);
    if (total <= 0) {
      return { error: "Add at least some free time this week to build a plan.", days: [], total: 0 };
    }
    var buckets = allocateHours(total, skills, career);
    var remaining = buckets.map(function (b) {
      return Object.assign({}, b);
    });
    var days = DAYS.map(function (day) {
      var free = roundHalf(Number(hours[day]) || 0);
      var slots = [];
      var left = free;
      remaining.forEach(function (bucket) {
        if (left <= 0 || bucket.hours <= 0) return;
        var chunk = Math.min(left, bucket.hours);
        chunk = roundHalf(chunk);
        if (chunk <= 0) return;
        slots.push({
          skillId: bucket.skill.id,
          name: bucket.skill.name,
          hours: chunk,
          level: bucket.level,
          tip: bucket.skill.tip
        });
        bucket.hours = roundHalf(bucket.hours - chunk);
        left = roundHalf(left - chunk);
      });
      return { day: day, hours: free, slots: slots };
    });
    return { error: null, days: days, total: total, allocation: buckets };
  }

  function averagePercent(skills) {
    var ids = Object.keys(skills || {});
    if (!ids.length) return 0;
    var sum = ids.reduce(function (acc, id) {
      return acc + (skills[id].percent || 0);
    }, 0);
    return Math.round(sum / ids.length);
  }

  return {
    DAYS: DAYS,
    levelFromPercent: levelFromPercent,
    levelLabel: levelLabel,
    scoreTest: scoreTest,
    mergeMonthly: mergeMonthly,
    snapshotFromSkills: snapshotFromSkills,
    pickMonthlyQuestions: pickMonthlyQuestions,
    buildSchedule: buildSchedule,
    averagePercent: averagePercent
  };
})();
