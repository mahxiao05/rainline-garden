/* Glossary: search as you type (matches the word and its meaning), topic buttons and ?q= links. */
(function () {
  var input = document.getElementById("gl-q");
  if (!input) return;
  var items = Array.prototype.slice.call(document.querySelectorAll(".gl-list .glossary > div"));
  var letters = Array.prototype.slice.call(document.querySelectorAll(".gl-letter"));
  var count = document.querySelector(".gl-count"), none = document.querySelector(".gl-none");
  var btns = Array.prototype.slice.call(document.querySelectorAll(".gl-topics button"));
  var topic = "all";
  // Keep each term's original text so highlights can be redrawn.
  items.forEach(function (el) {
    el._parts = Array.prototype.slice.call(el.querySelectorAll("dt, dd:not(.gl-tag)")).map(function (n) {
      var t = n.firstChild && n.firstChild.nodeType === 3 ? n.firstChild : null;
      return { node: n, text: t ? t.nodeValue : "", first: t };
    });
    el._hay = el.textContent.toLowerCase();
  });
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  // Matches count only at the start of a word, so "ph" finds pH but not aphids.
  function starts(lo, q, from) {
    var j = lo.indexOf(q, from);
    while (j > 0 && /[a-z0-9]/.test(lo.charAt(j - 1))) j = lo.indexOf(q, j + 1);
    return j;
  }
  function mark(text, q) {
    if (!q) return esc(text);
    var lo = text.toLowerCase(), out = "", i = 0, j;
    while ((j = starts(lo, q, i)) >= 0) { out += esc(text.slice(i, j)) + "<mark>" + esc(text.slice(j, j + q.length)) + "</mark>"; i = j + q.length; }
    return out + esc(text.slice(i));
  }
  function run() {
    var q = input.value.trim().toLowerCase(), shown = 0;
    items.forEach(function (el) {
      var ok = (topic === "all" || el.getAttribute("data-topic") === topic) && (!q || starts(el._hay, q, 0) >= 0);
      el.hidden = !ok;
      if (ok) shown++;
      el._parts.forEach(function (p) {
        if (!p.first) return;
        var span = p.node.querySelector(".gl-hl");
        if (!span) { span = document.createElement("span"); span.className = "gl-hl"; p.node.replaceChild(span, p.first); }
        span.innerHTML = mark(p.text, ok ? q : "");
      });
    });
    letters.forEach(function (l) { l.hidden = !l.querySelector(".glossary > div:not([hidden])"); });
    none.hidden = shown > 0;
    count.textContent = q || topic !== "all" ? shown + (shown === 1 ? " term" : " terms") : "";
    if (history.replaceState) history.replaceState(null, "", q ? "?q=" + encodeURIComponent(input.value.trim()) + location.hash : location.pathname + location.hash);
  }
  input.addEventListener("input", run);
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      topic = b.getAttribute("data-topic");
      btns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      run();
    });
  });
  var site = document.querySelector(".gl-site");
  if (site) site.addEventListener("click", function () {
    var btn = document.querySelector(".head-search"), q = input.value;
    if (!btn) return;
    btn.click();
    setTimeout(function () { var s = document.getElementById("search-q"); if (s) { s.value = q; s.dispatchEvent(new Event("input")); } }, 50);
  });
  var start = new URLSearchParams(location.search).get("q");
  if (start) { input.value = start; run(); }
})();
