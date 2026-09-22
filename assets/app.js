/* ============================================================
   학습 사이트 스캐폴드 · 렌더러
   content/session-04.js 의 window.SESSION_DATA 를 읽어 화면을 그립니다.
   콘텐츠를 채우려면 이 파일이 아니라 content/session-04.js 만 고치세요.
   ============================================================ */
(function () {
  "use strict";

  var D = window.SESSION_DATA || {};

  /* ── 유틸 ──────────────────────────────── */

  // 점 표기 경로로 값 꺼내기: get(D, "meta.title")
  function get(obj, path) {
    return String(path).split(".").reduce(function (o, k) {
      return (o == null) ? undefined : o[k];
    }, obj);
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function slot(name) {
    return document.querySelector('[data-slot="' + name + '"]');
  }

  function isFilled(v) {
    if (v == null) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "string") return v.trim() !== "";
    return true;
  }

  // 지정한 키 중 하나라도 채워진 항목만 남깁니다.
  function prune(items, keys) {
    return (items || []).filter(function (it) {
      return keys.some(function (k) { return isFilled(it[k]); });
    });
  }

  // 아직 안 채운 자리에 회색 안내 문구를 넣습니다.
  function placeholder(text) {
    var p = el("p", null, text);
    p.style.color = "var(--ink-3)";
    p.style.fontStyle = "italic";
    p.style.margin = "0";
    return p;
  }

  // 아직 안 채운 슬롯에 안내 박스를 넣습니다.
  function markEmpty(node, key) {
    if (!node) return;
    var box = el("div", "empty");
    box.innerHTML = '아직 비어 있습니다 — <code>content/session-04.js</code> 의 <code>' +
      key + "</code> 를 채우세요.";
    node.innerHTML = "";
    node.appendChild(box);
    var sec = node.closest("[data-section]");
    if (sec) sec.classList.add("is-empty");
  }

  /* ── 텍스트 바인딩 ─────────────────────── */

  function bindText() {
    document.querySelectorAll("[data-bind]").forEach(function (node) {
      var v = get(D, node.getAttribute("data-bind"));
      if (isFilled(v)) {
        node.textContent = v;
      } else if (!node.textContent.trim()) {
        node.remove();
      }
    });
    tidySeparators();
  }

  // 빈 항목이 지워지면 구분점(·)이 겹치거나 끝에 남습니다. 그걸 정리합니다.
  function tidySeparators() {
    document.querySelectorAll(".eyebrow").forEach(function (row) {
      var kids = Array.prototype.slice.call(row.children);
      var prevWasDot = true;                       // 맨 앞의 점도 제거 대상
      kids.forEach(function (k) {
        var isDot = k.classList.contains("dot");
        if (isDot && prevWasDot) { k.remove(); return; }
        prevWasDot = isDot;
      });
      var last = row.lastElementChild;
      while (last && last.classList.contains("dot")) {
        last.remove();
        last = row.lastElementChild;
      }
    });
  }

  /* ── 복사 버튼 ─────────────────────────── */

  function copyBtn(getText) {
    var b = el("button", "copy-btn", "복사");
    b.type = "button";
    b.addEventListener("click", function () {
      var text = getText();
      if (!text) return;
      var done = function () {
        b.textContent = "복사됨";
        b.classList.add("done");
        setTimeout(function () {
          b.textContent = "복사";
          b.classList.remove("done");
        }, 1600);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = el("textarea");
        ta.value = text;
        ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* noop */ }
        ta.remove();
      }
    });
    return b;
  }

  // 제목 + 본문 + 복사 버튼을 가진 프롬프트 박스
  function promptBox(title, body) {
    var box = el("div", "prompt");
    var head = el("div", "prompt-head");
    head.appendChild(el("span", "prompt-title", title || "프롬프트"));
    var pre = el("div", "prompt-body", body || "");
    head.appendChild(copyBtn(function () { return pre.textContent; }));
    box.appendChild(head);
    box.appendChild(pre);
    return box;
  }

  /* ── 섹션 렌더러 ───────────────────────── */

  var render = {

    nav: function (host, items) {
      items.forEach(function (it) {
        var a = el("a", null, it.label);
        a.href = it.href || "#";
        if (/^https?:/.test(a.href)) { a.target = "_blank"; a.rel = "noopener"; }
        host.appendChild(a);
      });
    },

    badges: function (host, items) {
      items.forEach(function (t) { host.appendChild(el("li", null, t)); });
    },

    heroLinks: function (host, items) {
      items.forEach(function (it) {
        var a = el("a", "btn" + (it.style === "ghost" ? " ghost" : ""), it.label);
        a.href = it.href || "#";
        if (/^https?:/.test(a.href)) { a.target = "_blank"; a.rel = "noopener"; }
        host.appendChild(a);
      });
    },

    notes: function (host, items) {
      items.forEach(function (it) {
        host.appendChild(el("p", "note " + (it.kind || "info"), it.text));
      });
    },

    keyPoints: function (host, items) {
      var list = prune(items, ["title", "body"]);
      if (!list.length) return false;
      list.forEach(function (it) {
        var c = el("div", "card");
        c.appendChild(el("h3", null, it.title || "(제목 없음)"));
        c.appendChild(el("p", null, it.body));
        host.appendChild(c);
      });
    },

    timeline: function (host, items) {
      items.forEach(function (it) {
        var li = el("li");
        var head = el("div", "tl-head");
        if (it.time) head.appendChild(el("span", "tl-time", it.time));
        head.appendChild(el("span", "tl-title", it.title));
        if (it.tag) head.appendChild(el("span", "tl-tag", it.tag));
        li.appendChild(head);
        if (it.desc) li.appendChild(el("p", "tl-desc", it.desc));
        host.appendChild(li);
      });
    },

    framework: function (host, items) {
      items.forEach(function (it, i) {
        var c = el("div", "card");
        c.appendChild(el("span", "num", it.no || String(i + 1)));
        c.appendChild(el("h3", null, it.name));
        c.appendChild(el("p", null, it.question));
        if (it.example) {
          var eg = el("p", "eg");
          eg.appendChild(el("b", null, "예 · "));
          eg.appendChild(document.createTextNode(it.example));
          c.appendChild(eg);
        }
        host.appendChild(c);
      });
    },

    mapping: function (table, data) {
      var thead = el("thead"), hr = el("tr");
      (data.columns || []).forEach(function (c) { hr.appendChild(el("th", null, c)); });
      thead.appendChild(hr);
      var tbody = el("tbody");
      (data.rows || []).forEach(function (row) {
        var tr = el("tr");
        row.forEach(function (cell) {
          tr.appendChild(el("td", isFilled(cell) ? null : "none", isFilled(cell) ? cell : "—"));
        });
        tbody.appendChild(tr);
      });
      table.innerHTML = "";
      table.appendChild(thead);
      table.appendChild(tbody);
    },

    compare: function (host, data) {
      [["bad", data.bad], ["good", data.good]].forEach(function (pair) {
        var kind = pair[0], d = pair[1];
        if (!d) return;
        var box = el("div", "cmp " + kind);
        box.appendChild(el("div", "cmp-label", d.label || (kind === "bad" ? "이렇게 말고" : "이렇게")));
        if (isFilled(d.text)) {
          box.appendChild(el("div", "cmp-body", d.text));
        } else {
          box.appendChild(placeholder("예시 문장을 넣어 주세요."));
        }
        if (isFilled(d.why)) box.appendChild(el("p", "cmp-why", d.why));
        host.appendChild(box);
      });
    },

    practice: function (host, data) {
      if (isFilled(data.title)) host.appendChild(el("h3", "step-title", data.title));
      if (data.base) host.appendChild(promptBox(data.base.title || "처음 쓴 문장", data.base.text));
      (data.steps || []).forEach(function (s, i) {
        var step = el("div", "step");
        var head = el("div", "step-head");
        head.appendChild(el("span", "step-num", s.no || String(i + 1)));
        var txt = el("div");
        txt.appendChild(el("h3", "step-title", isFilled(s.title) ? s.title : "(단계 제목을 넣어 주세요)"));
        if (isFilled(s.desc)) txt.appendChild(el("p", "step-desc", s.desc));
        head.appendChild(txt);
        step.appendChild(head);
        step.appendChild(promptBox(s.promptTitle || "이어서 쓴 문장", s.prompt));
        host.appendChild(step);
      });
    },

    variants: function (host, items) {
      var list = prune(items, ["label", "text"]);
      if (!list.length) return false;
      list.forEach(function (it) {
        var c = el("div", "card");
        c.appendChild(el("h3", null, it.label || "(구분 없음)"));
        if (isFilled(it.text)) {
          c.appendChild(el("p", null, it.text));
          var foot = el("p", "eg");
          foot.appendChild(copyBtn(function () { return it.text; }));
          c.appendChild(foot);
        } else {
          c.appendChild(placeholder("문구를 넣어 주세요."));
        }
        host.appendChild(c);
      });
    },

    checklist: function (host, items) {
      items.forEach(function (t) { host.appendChild(el("li", null, t)); });
    },

    footLinks: function (host, groups) {
      groups.forEach(function (g) {
        host.appendChild(el("h4", null, g.title));
        var ul = el("ul");
        (g.items || []).forEach(function (it) {
          var li = el("li"), a = el("a", null, it.label);
          a.href = it.href || "#";
          if (/^https?:/.test(a.href)) { a.target = "_blank"; a.rel = "noopener"; }
          li.appendChild(a);
          ul.appendChild(li);
        });
        host.appendChild(ul);
      });
    },

    attribution: function (host, data) {
      host.textContent = data.text || "";
      if (data.sourceUrl) {
        host.appendChild(document.createTextNode(" · 원본: "));
        var a = el("a", null, data.sourceLabel || data.sourceUrl);
        a.href = data.sourceUrl;
        a.target = "_blank";
        a.rel = "noopener";
        host.appendChild(a);
      }
    }
  };

  /* ── 슬롯 → 렌더러 배선 ────────────────── */

  var WIRING = [
    ["nav",           "nav",           render.nav],
    ["badges",        "badges",        render.badges],
    ["heroLinks",     "heroLinks",     render.heroLinks],
    ["goal.notes",    "goal.notes",    render.notes],
    ["keyPoints",     "keyPoints",     render.keyPoints],
    ["timeline",      "timeline",      render.timeline],
    ["framework.items","framework.items", render.framework],
    ["mapping",       "mapping",       render.mapping],
    ["compare",       "compare",       render.compare],
    ["practice",      "practice",      render.practice],
    ["variants",      "variants",      render.variants],
    ["checklist",     "checklist",     render.checklist],
    ["footLinks",     "footLinks",     render.footLinks],
    ["attribution",   "attribution",   render.attribution]
  ];

  function renderAll() {
    bindText();
    WIRING.forEach(function (w) {
      var host = slot(w[0]);
      if (!host) return;
      var data = get(D, w[1]);
      if (isFilled(data)) {
        host.innerHTML = "";
        try {
          // 렌더러가 false 를 돌려주면 "보여 줄 내용이 없다"는 뜻입니다.
          if (w[2](host, data) === false) markEmpty(host, w[1]);
        } catch (err) {
          console.error("[render] " + w[1], err);
          markEmpty(host, w[1]);
        }
      } else {
        markEmpty(host, w[1]);
      }
    });
  }

  /* ── 글자 크기 ─────────────────────────── */

  var FS_MIN = 1, FS_MAX = 6, FS_KEY = "fsStep";

  function applyFont(step) {
    step = Math.min(FS_MAX, Math.max(FS_MIN, step));
    document.documentElement.style.setProperty("--fs-step", step);
    var out = document.getElementById("fontStep");
    if (out) out.textContent = step;
    try { localStorage.setItem(FS_KEY, step); } catch (e) { /* noop */ }
    return step;
  }

  function initFont() {
    var step = 2;
    try { step = parseInt(localStorage.getItem(FS_KEY), 10) || 2; } catch (e) { /* noop */ }
    step = applyFont(step);
    document.querySelectorAll("[data-font]").forEach(function (b) {
      b.addEventListener("click", function () {
        step = applyFont(step + (b.dataset.font === "up" ? 1 : -1));
      });
    });
  }

  /* ── 테마 ──────────────────────────────── */

  var TH_KEY = "theme", TH_ORDER = ["auto", "light", "dark"];
  var TH_ICON = { auto: "◐", light: "☀", dark: "☾" };

  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var ico = document.querySelector("[data-theme-icon]");
    if (ico) ico.textContent = TH_ICON[t] || "◐";
    try { localStorage.setItem(TH_KEY, t); } catch (e) { /* noop */ }
    return t;
  }

  function initTheme() {
    var t = "auto";
    try { t = localStorage.getItem(TH_KEY) || "auto"; } catch (e) { /* noop */ }
    t = applyTheme(TH_ORDER.indexOf(t) >= 0 ? t : "auto");
    var btn = document.getElementById("themeBtn");
    if (btn) btn.addEventListener("click", function () {
      t = applyTheme(TH_ORDER[(TH_ORDER.indexOf(t) + 1) % TH_ORDER.length]);
    });
  }

  /* ── 메뉴 · 맨 위로 ────────────────────── */

  function initChrome() {
    var btn = document.getElementById("menuBtn");
    var drawer = document.getElementById("navdrawer");
    if (btn && drawer) {
      btn.addEventListener("click", function () {
        var open = drawer.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
      });
      drawer.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          drawer.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
        }
      });
    }

    var top = document.getElementById("toTop");
    if (top) {
      top.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      var onScroll = function () {
        top.classList.toggle("show", window.scrollY > 500);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* ── 시작 ──────────────────────────────── */

  function boot() {
    if (!window.SESSION_DATA) {
      console.warn("[scaffold] content/session-04.js 를 찾지 못했습니다.");
    }
    renderAll();
    initFont();
    initTheme();
    initChrome();

    var t = get(D, "meta.title");
    var s = get(D, "site.title");
    if (isFilled(t)) document.title = t + (isFilled(s) ? " · " + s : "");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
