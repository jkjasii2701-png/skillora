window.SkilloraCharts = (function () {
  function colorForLevel(level) {
    if (level === "weak") return "#e11d48";
    if (level === "average") return "#ca8a04";
    return "#16a34a";
  }

  function drawBars(canvas, skills, career) {
    if (!canvas || !career) return;
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    var rows = career.skills;
    var top = 24;
    var rowH = (height - 40) / rows.length;
    rows.forEach(function (skill, i) {
      var data = skills[skill.id] || { percent: 0, level: "weak" };
      var y = top + i * rowH;
      ctx.fillStyle = "#1c2434";
      ctx.font = "14px Segoe UI, sans-serif";
      ctx.fillText(skill.name, 16, y + 4);
      var barX = 140;
      var barW = width - 200;
      ctx.fillStyle = "#eef2ff";
      ctx.fillRect(barX, y - 10, barW, 18);
      ctx.fillStyle = colorForLevel(data.level);
      ctx.fillRect(barX, y - 10, Math.max(0, barW * (data.percent / 100)), 18);
      ctx.fillStyle = "#1c2434";
      ctx.fillText(data.percent + "%", barX + barW + 10, y + 4);
    });
  }

  function drawLine(canvas, history) {
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    var points = (history || []).map(function (snap) {
      return window.SkilloraLogic.averagePercent(snap.skills);
    });
    if (!points.length) {
      ctx.fillStyle = "#5b667a";
      ctx.font = "16px Segoe UI, sans-serif";
      ctx.fillText("Take a test to see progress over time.", 24, height / 2);
      return;
    }

    var pad = 40;
    var min = 0;
    var max = 100;
    ctx.strokeStyle = "#e2e8f2";
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, height - pad);
    ctx.lineTo(width - pad, height - pad);
    ctx.stroke();

    ctx.fillStyle = "#5b667a";
    ctx.font = "12px Segoe UI, sans-serif";
    ctx.fillText("0%", 8, height - pad);
    ctx.fillText("100%", 4, pad + 4);

    var usableW = width - pad * 2;
    var usableH = height - pad * 2;
    ctx.strokeStyle = "#3d5afe";
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach(function (p, i) {
      var x = pad + (points.length === 1 ? usableW / 2 : (usableW * i) / (points.length - 1));
      var y = height - pad - (usableH * (p - min)) / (max - min);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    points.forEach(function (p, i) {
      var x = pad + (points.length === 1 ? usableW / 2 : (usableW * i) / (points.length - 1));
      var y = height - pad - (usableH * (p - min)) / (max - min);
      ctx.fillStyle = "#0d9488";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1c2434";
      ctx.fillText(p + "%", x - 10, y - 10);
    });
  }

  return { drawBars: drawBars, drawLine: drawLine };
})();
