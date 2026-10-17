/* @ds-bundle: {"format":4,"namespace":"Askelia","components":[{"name":"StatusBadge"},{"name":"QuestionCard"},{"name":"Citation"},{"name":"SqlEditor"},{"name":"LineageNode"},{"name":"KpiCard"},{"name":"AnswerMeta"},{"name":"Icon"}]} */
(function () {
  var React = window.React, h = React.createElement, useState = React.useState;

  var P = {
    home: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z",
    doc: "M14 3H6v18h12V7z M14 3v4h4",
    query: "M4 6h16 M4 12h10 M4 18h7",
    book: "M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z M4 17a3 3 0 0 1 3-3h11",
    lineage: "M3 5h5v4H3z M16 3h5v4h-5z M16 17h5v4h-5z M8 7h4v12h4 M12 5h4",
    report: "M4 20V10 M10 20V4 M16 20v-7 M21 20H3",
    history: "M3 12a9 9 0 1 0 3-6.7 M3 4v5h5 M12 7v5l3 2",
    check: "M5 12.5 10 17 19 7",
    x: "M6 6l12 12M18 6 6 18",
    db: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
    down: "M6 9l6 6 6-6",
    right: "M9 6l6 6-6 6",
    copy: "M8 8h12v12H8z M4 16V4h12",
    download: "M12 3v12 M7 10l5 5 5-5 M4 21h16",
    edit: "M4 20h4L19 9l-4-4L4 16z",
    up: "M12 19V5 M6 11l6-6 6 6",
    upload: "M12 21V9 M7 14l5-5 5 5 M4 3h16",
    search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M20 20l-4-4",
    plus: "M12 5v14M5 12h14",
    clip: "M20 12l-8 8a5 5 0 0 1-7-7l8-8a3 3 0 0 1 4 4l-8 8a1 1 0 0 1-2-2l7-7",
    more: "M5 12h.01 M12 12h.01 M19 12h.01",
    help: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14 M12 17h.01",
    settings: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z",
    filter: "M4 5h16 M7 12h10 M10 19h4",
    side: "M3 4h18v16H3z M15 4v16",
    play: "M7 4l13 8-13 8z"
  };
  function iconSvg(name, cls) {
    return '<svg class="ak-ico' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + (P[name] || P.help) + '"/></svg>';
  }
  function Icon(props) {
    return h("svg", { className: "ak-ico" + (props.className ? " " + props.className : ""), viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: P[props.name] || P.help }));
  }
  /* Remplace chaque <i data-i="nom"></i> d'un fragment statique par l'icône. */
  function hydrateIcons(root) {
    (root || document).querySelectorAll("i[data-i]").forEach(function (el) { el.outerHTML = iconSvg(el.getAttribute("data-i"), el.className); });
  }

  var STATUS = { valide: "Validé", verifier: "À vérifier", encours: "En cours", erreur: "Erreur", neutre: "Brouillon" };
  function StatusBadge(props) {
    var s = STATUS[props.status] ? props.status : "neutre";
    return h("span", { className: "ak-status ak-status-" + s }, props.children || STATUS[s]);
  }

  function QuestionCard(props) {
    var st = useState(props.defaultValue != null ? [].concat(props.defaultValue) : []), sel = st[0], setSel = st[1];
    var cs = useState((props.codes || []).map(function (c) { return c.selected !== false; })), on = cs[0], setOn = cs[1];
    function toggle(v) {
      var next = props.multiple ? (sel.indexOf(v) >= 0 ? sel.filter(function (x) { return x !== v; }) : sel.concat(v)) : [v];
      setSel(next); if (props.onChange) props.onChange(props.multiple ? next : v);
    }
    return h("section", { className: "ak-q" },
      h("div", null, h("p", { className: "ak-q-label" }, props.title), props.help && h("p", { className: "ak-q-help" }, props.help)),
      props.options && h("div", { className: "ak-options", role: props.multiple ? "group" : "radiogroup" }, props.options.map(function (o) {
        return h("button", { key: o.value, type: "button", className: "ak-opt", "aria-pressed": sel.indexOf(o.value) >= 0 ? "true" : "false", onClick: function () { toggle(o.value); } },
          o.label, o.note && h("span", { className: "ak-opt-note" }, o.note));
      })),
      props.codes && h("div", { className: "ak-checklist" }, props.codes.map(function (c, i) {
        return h("div", { key: c.code, className: "ak-checkrow", role: "checkbox", tabIndex: 0, "aria-checked": on[i] ? "true" : "false", onClick: function () { var n = on.slice(); n[i] = !n[i]; setOn(n); } },
          h("span", { className: "ak-box", "data-on": on[i] ? "true" : "false" }, on[i] && h(Icon, { name: "check" })),
          h("span", { className: "ak-mono", style: { fontSize: 12.5 } }, c.code),
          h("span", null, c.label),
          h("span", { className: "ak-muted ak-num", style: { fontSize: 13 } }, c.count));
      })),
      props.freeText && h("input", { className: "ak-input", placeholder: props.freeText, "aria-label": "Réponse libre" }));
  }

  function Citation(props) {
    return h("button", { type: "button", className: "ak-cite", "aria-pressed": props.active ? "true" : "false", onClick: props.onClick },
      h("span", { className: "ak-cite-n" }, props.n),
      h("span", null, h("span", { className: "ak-cite-src" }, props.source), props.location && h("span", { className: "ak-cite-loc" }, " · " + props.location),
        props.quote && h("span", { className: "ak-cite-quote" }, "« " + props.quote + " »")));
  }

  /* Pied de réponse : sources, raisonnement replié, fiabilité, vérifier. */
  function AnswerMeta(props) {
    var st = useState(!!props.open), open = st[0], setOpen = st[1];
    return h("div", { className: "ak-stack", style: { gap: 10 } },
      h("div", { className: "ak-answer-foot" },
        props.sources != null && h("span", null, props.sources + " source" + (props.sources > 1 ? "s" : "")),
        props.steps && h("button", { className: "ak-link", "aria-expanded": open ? "true" : "false", onClick: function () { setOpen(!open); } }, open ? "Masquer le raisonnement" : "Voir le raisonnement", h(Icon, { name: "down", className: "ak-ico-sm" })),
        props.reliability && h("span", null, "Fiabilité : " + props.reliability),
        h("span", { className: "ak-spacer" }),
        h("button", { className: "ak-link" }, h(Icon, { name: "check", className: "ak-ico-sm" }), props.verifyLabel || "Vérifier"),
        h("button", { className: "ak-iconbtn", "aria-label": "Copier" }, h(Icon, { name: "copy" }))),
      open && props.steps && h("ol", { className: "ak-steps" }, props.steps.map(function (s, i) { return h("li", { key: i }, s); })));
  }

  var KW_RE = /^(WITH|AS|SELECT|DISTINCT|FROM|WHERE|AND|OR|NOT|IN|IS|NULL|JOIN|LEFT|INNER|ON|GROUP|BY|ORDER|HAVING|UNION|ALL|EXISTS|BETWEEN|CASE|WHEN|THEN|ELSE|END|INTERVAL|INSERT|INTO|USING|DATE)$/i;
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function highlight(line) {
    var out = "", re = /(--.*$)|('(?:[^']|'')*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_*][A-Za-z0-9_]*)*)|(\s+|.)/g, m;
    while ((m = re.exec(line))) {
      if (m[1]) out += '<span class="tk-com">' + esc(m[1]) + "</span>";
      else if (m[2]) out += '<span class="tk-str">' + esc(m[2]) + "</span>";
      else if (m[3]) out += '<span class="tk-num">' + m[3] + "</span>";
      else if (m[4]) out += KW_RE.test(m[4]) ? '<span class="tk-kw">' + m[4] + "</span>" : /^\s*\(/.test(line.slice(re.lastIndex)) ? '<span class="tk-fn">' + m[4] + "</span>" : '<span class="tk-id">' + m[4] + "</span>";
      else out += esc(m[5]);
    }
    return out || " ";
  }
  function SqlEditor(props) {
    var lines = (props.sql || "").replace(/\s+$/, "").split("\n"), notes = {};
    (props.blocks || []).forEach(function (b) { notes[b.line] = b; });
    var ex = useState(!!props.explain), show = ex[0], setShow = ex[1];
    var cp = useState(false), copied = cp[0], setCopied = cp[1];
    var rows = [];
    lines.forEach(function (l, i) {
      var b = notes[i + 1];
      if (b && show) rows.push(h("div", { key: "n" + i, className: "ak-sql-note" }, h("b", null, b.name), " — ", b.explain));
      rows.push(h("div", { key: i, className: "ak-sql-line" }, h("span", { dangerouslySetInnerHTML: { __html: highlight(l) } })));
    });
    return h("div", { className: "ak-sql", style: props.height ? { height: props.height } : null },
      h("div", { className: "ak-sql-bar" },
        h("span", { className: "ak-sql-name" }, props.title || "requete.sql"),
        props.dialect && h("span", { className: "ak-muted", style: { fontSize: 13 } }, props.dialect),
        h("span", { className: "ak-spacer" }),
        props.blocks && h("label", { className: "ak-link", style: { gap: 6 } }, h("input", { type: "checkbox", checked: show, onChange: function () { setShow(!show); } }), "Expliquer chaque étape"),
        h("button", { className: "ak-btn ak-btn-sm", onClick: function () { try { navigator.clipboard.writeText(props.sql); } catch (e) {} setCopied(true); setTimeout(function () { setCopied(false); }, 1500); } }, copied ? "Copié" : "Copier")),
      h("div", { className: "ak-sql-body" }, h("div", { className: "ak-sql-pre", role: "code" }, rows)));
  }

  var LAYER = { source: "Source", bronze: "Bronze", silver: "Silver", gold: "Gold" };
  function LineageNode(props) {
    var layer = LAYER[props.layer] ? props.layer : "source";
    return h("button", { type: "button", className: "ak-node ak-node-" + layer, "aria-pressed": props.selected ? "true" : "false", onClick: props.onClick, style: props.style },
      h("div", { className: "ak-node-top" }, h("span", { className: "ak-node-layer" }), props.label || LAYER[layer], props.warn && h("span", { className: "ak-node-warn", title: "Contrôle à vérifier" })),
      h("div", { className: "ak-node-name" }, props.name),
      props.rows && h("div", { className: "ak-node-rows" }, props.rows + " lignes"));
  }

  function KpiCard(props) {
    return h("div", { className: "ak-kpi" },
      h("div", { className: "ak-kpi-label" }, props.label),
      h("div", { className: "ak-kpi-val" }, props.value, props.unit && h("small", null, props.unit)),
      (props.delta || props.hint) && h("div", { className: "ak-kpi-foot" },
        props.delta && h("span", { className: props.deltaTone ? "ak-delta-" + props.deltaTone : "" }, props.delta), props.delta && props.hint ? " · " : "", props.hint));
  }

  var NAV = [["accueil", "home", "Accueil"], ["documents", "doc", "Documents"], ["cohortes", "query", "Cohortes & SQL"], ["dictionnaires", "book", "Dictionnaires"], ["etl", "lineage", "ETL & Lignage"], ["syntheses", "report", "Synthèses"], ["historique", "history", "Historique"]];
  function mountShell(app, opts) {
    opts = opts || {};
    var active = opts.active || app.getAttribute("data-active");
    var nav = NAV.map(function (n) { return '<a href="#"' + (n[0] === active ? ' aria-current="page"' : "") + ">" + iconSvg(n[1]) + n[2] + "</a>"; }).join("");
    var side = '<aside class="ak-side"><div class="ak-brand"><span class="ak-brand-mark">A</span>Askelia</div>' +
      '<button class="ak-btn ak-new">' + iconSvg("plus") + "Nouvelle demande</button>" +
      '<nav class="ak-nav" aria-label="Modules">' + nav + "</nav>" +
      '<div class="ak-side-foot"><span class="ak-local">100 % local – aucune donnée ne quitte l\'hôpital</span>' +
      '<div class="ak-user"><span class="ak-avatar">CM</span>Camille Martin</div></div></aside>';
    var top = '<header class="ak-top">' +
      '<button class="ak-ctx">' + iconSvg("db") + "<b>eds_prod</b> · OMOP 5.4" + iconSvg("down") + "</button>" +
      '<span class="ak-sep"></span><button class="ak-ctx">' + iconSvg("book") + "<b>4</b> dictionnaires" + iconSvg("down") + "</button>" +
      '<span class="ak-sep"></span><button class="ak-ctx">Modèle <b>Mistral Small 3</b>' + iconSvg("down") + "</button>" +
      '<span class="ak-spacer"></span><button class="ak-iconbtn" aria-label="Aide">' + iconSvg("help") + '</button><button class="ak-iconbtn" aria-label="Réglages">' + iconSvg("settings") + "</button></header>";
    app.insertAdjacentHTML("afterbegin", side + top);
  }

  window.Askelia = Object.assign(window.Askelia || {}, {
    StatusBadge: StatusBadge, QuestionCard: QuestionCard, Citation: Citation, SqlEditor: SqlEditor, LineageNode: LineageNode,
    KpiCard: KpiCard, AnswerMeta: AnswerMeta, Icon: Icon, iconSvg: iconSvg, hydrateIcons: hydrateIcons, highlightSql: highlight, mountShell: mountShell
  });
})();
