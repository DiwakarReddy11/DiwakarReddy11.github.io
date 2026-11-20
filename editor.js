/* =========================================================
   SITE EDITOR
   Open with index.html?edit (or press Ctrl + Shift + E).
   Edits are saved in this browser as a draft. Click
   "Download content.js" and replace the file in the site
   folder to publish them for everyone.
   ========================================================= */
(() => {
  "use strict";
  const SITE = window.SITE;
  if (!SITE) return;
  const $ = (s, el = document) => el.querySelector(s);
  const h = (tag, props = {}, ...kids) => {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== null && v !== false) el.setAttribute(k, v === true ? "" : v);
    });
    kids.flat().forEach((k) => k != null && el.append(k.nodeType ? k : document.createTextNode(k)));
    return el;
  };
  const ic = (id) => `<svg class="icon" viewBox="0 0 24 24"><use href="#i-${id}"/></svg>`;
  const clone = (o) => JSON.parse(JSON.stringify(o));

  /* ---------------- Schema ---------------- */
  const ICONS = ["spark", "bot", "doc", "shield", "db", "search", "layers", "check", "copy", "chart", "server", "zap", "user", "clock", "code", "leaf", "trend", "award", "route", "filter", "book", "refresh", "gate", "msg", "pr", "table", "eye", "cap", "pin", "camera", "sun", "heart", "globe", "music", "github", "mail"];
  const T = (label, hint) => ({ type: "text", label, hint });
  const TA = (label, hint, rows = 3) => ({ type: "textarea", label, hint, rows });
  const N = (label, hint) => ({ type: "number", label, hint });
  const IMG = (label, hint, maxDim = 1400) => ({ type: "image", label, hint, maxDim });
  const LINES = (label, hint) => ({ type: "strings", label, hint: hint || "One item per line." });
  const ICON = (label = "Icon") => ({ type: "icon", label });
  const SEL = (label, options) => ({ type: "select", label, options });
  const OBJ = (fields) => ({ type: "object", fields });
  const LIST = (label, item, template, title, addLabel, opts = {}) => ({ type: "list", label, item, template, title, addLabel, ...opts });

  const metricDef = OBJ({
    v: N("Number", "The value that counts up, e.g. 89.6"),
    dec: N("Decimal places", "0 for whole numbers, 1 for 89.6, 2 for 0.97"),
    pre: T("Before the number", "Optional, e.g. $ or +"),
    suf: T("After the number", "Optional, e.g. % or ms"),
    label: T("Label")
  });
  const metricTpl = () => ({ pre: "", v: 0, dec: 0, suf: "", label: "New metric" });
  const metricTitle = (m) => `${m.pre || ""}${m.v ?? ""}${m.suf || ""}  ${m.label || ""}`;

  const projectDef = OBJ({
    title: T("Project title"),
    status: SEL("Status", [["live", "Public on GitHub"], ["wip", "In active development"], ["resume", "Professional project (no public code)"]]),
    short: TA("Card summary", "One or two sentences shown on the project overview card.", 2),
    tagline: TA("Slide introduction", "The paragraph under the title on the project's slide.", 3),
    repo: T("GitHub link", "Leave empty if the code isn't public."),
    demo: T("Live demo link", "Optional."),
    image: IMG("Screenshot or cover image", "Optional. Shown on the overview card and on the slide.", 1600),
    imageCaption: T("Image caption", "Optional."),
    glow: { type: "color", label: "Accent glow colour" },
    problem: TA("The problem", "", 4),
    solution: TA("The solution", "", 4),
    metrics: LIST("Key results", metricDef, metricTpl, metricTitle, "Add result", { hint: "Up to 4 look best." }),
    flow: OBJ({
      steps: LIST("Architecture flow steps", OBJ({ icon: ICON(), t: T("Step title"), s: T("Short description") }),
        () => ({ icon: "spark", t: "New step", s: "" }), (s, i) => `${i + 1}. ${s.t || ""}`, "Add step"),
      loop: { type: "optional", label: "Feedback loop arrow", toggle: "Show a loop arrow between two steps",
        of: OBJ({ from: N("From step number"), to: N("Back to step number"), label: T("Loop label") }),
        template: () => ({ from: 2, to: 1, label: "↺ retry" }), oneBased: true }
    }),
    how: LINES("How it works", "One step per line. You can use <b>bold</b>."),
    decisions: LIST("Engineering decisions", OBJ({ t: T("Title"), d: TA("Explanation", "", 2) }),
      () => ({ t: "New decision", d: "" }), (d) => d.t, "Add decision"),
    stack: LINES("Tech stack", "One technology per line.")
  });
  const projectTpl = () => ({
    id: "project-" + Date.now().toString(36), title: "New project", status: "live", short: "", tagline: "",
    repo: "", demo: "", image: "", imageCaption: "", glow: "#818cf8", problem: "", solution: "",
    metrics: [], flow: { steps: [], loop: null }, how: [], decisions: [], stack: []
  });

  const TABS = [
    { key: "profile", label: "Profile", def: OBJ({
      name: T("Full name"),
      photo: IMG("Profile photo", "Shown in the hero. A portrait (taller than wide) looks best.", 900),
      badge: T("Badge line", "Small line above your name."),
      typedPrefix: T("Typing line prefix", "e.g. I build"),
      typedRoles: LINES("Typing phrases", "One phrase per line. They rotate after the prefix."),
      summary: TA("Summary", "", 4),
      floatingTags: LINES("Tags around the photo", "Up to 4, one per line."),
      stats: LIST("Headline numbers", metricDef, metricTpl, metricTitle, "Add number"),
      email: T("Email"), linkedin: T("LinkedIn URL"), github: T("GitHub URL"),
      resume: T("Resume file path", "Put the PDF in the assets folder, e.g. assets/Diwakar_Reddy_Resume.pdf"),
      location: T("Location")
    }) },
    { key: "about", label: "About", def: OBJ({
      title1: T("Heading line 1"), title2: T("Heading line 2 (gradient)"),
      photo: IMG("Optional second photo", "Shown above the About text.", 1200),
      paragraphs: LINES("Paragraphs", "One paragraph per line. You can use <strong>bold</strong>."),
      principles: LIST("Principle cards", OBJ({ icon: ICON(), title: T("Title"), text: TA("Text", "", 2) }),
        () => ({ icon: "spark", title: "New principle", text: "" }), (p) => p.title, "Add card")
    }) },
    { key: "experience", label: "Experience", def: LIST("Jobs", OBJ({
      company: T("Company"), logo: IMG("Company logo", "Optional.", 300), role: T("Role"), dates: T("Dates", "e.g. Mar 2024 – Present"),
      bullets: LINES("Achievements", "One per line."),
      metrics: LIST("Impact numbers", metricDef, metricTpl, metricTitle, "Add number")
    }), () => ({ company: "New company", logo: "", role: "", dates: "", bullets: [], metrics: [] }), (x) => x.company, "Add job", { addAtTop: true }) },
    { key: "education", label: "Education", def: LIST("Education", OBJ({
      level: T("Level", "e.g. Undergraduate, Intermediate, Secondary School"),
      degree: T("Degree / class"), school: T("School / college"), location: T("Location"),
      years: T("Years", "e.g. 2019 – 2023"),
      scoreLabel: T("Score type", "e.g. CGPA, GPA, Percentage"),
      score: N("Score", "Leave empty to hide the score ring."), scoreMax: N("Out of", "e.g. 10 or 100"),
      logo: IMG("Logo", "Optional.", 300),
      details: TA("Details", "Optional.", 2)
    }), () => ({ level: "", degree: "New entry", school: "", location: "", years: "", scoreLabel: "", score: null, scoreMax: 10, logo: "", details: "" }),
    (e) => `${e.degree || ""} · ${e.school || ""}`, "Add education") },
    { key: "projects", label: "Projects", def: LIST("Projects", projectDef, projectTpl, (p, i) => `${String(i + 1).padStart(2, "0")} · ${p.title}`, "Add new project", { addAtTop: true, hint: "New projects are added at the top. Use the arrows to reorder." }) },
    { key: "beyond", label: "Beyond Code", def: OBJ({
      title1: T("Heading line 1"), title2: T("Heading line 2 (green)"),
      paragraphs: LINES("Paragraphs", "One paragraph per line."),
      sceneImage: IMG("Main photo", "Optional. Replaces the animated field illustration.", 1600),
      sceneCaption: T("Main photo caption"),
      cards: LIST("Interest cards", OBJ({ icon: ICON(), tone: SEL("Colour", [["green", "Green"], ["warm", "Warm"], ["cool", "Cool"]]), title: T("Title"), text: TA("Text", "", 3) }),
        () => ({ icon: "heart", tone: "green", title: "New interest", text: "" }), (c) => c.title, "Add card"),
      photos: LIST("Photo gallery", OBJ({ src: IMG("Photo", "", 1400), caption: T("Caption") }),
        () => ({ src: "", caption: "" }), (p, i) => p.caption || `Photo ${i + 1}`, "Add photo"),
      quote: TA("Quote", "Wrap words in <span>…</span> to highlight them.", 2)
    }) },
    { key: "skills", label: "Skills", def: LIST("Skill groups", OBJ({ icon: ICON(), group: T("Group name"), items: LINES("Skills", "One skill per line.") }),
      () => ({ icon: "spark", group: "New group", items: [] }), (g) => g.group, "Add group"),
      extra: { key: "marquee", def: LINES("Scrolling banner words", "One phrase per line.") } },
    { key: "certifications", label: "Certificates", def: LIST("Certificates", OBJ({
      title: T("Certificate name"), issuer: T("Issuer", "e.g. Microsoft Certified"), date: T("Date", "Optional, e.g. Jun 2025"),
      url: T("Verification link", "Optional."), image: IMG("Badge image", "Optional. Replaces the default icon.", 400)
    }), () => ({ title: "New certificate", issuer: "", date: "", url: "", image: "" }), (c) => c.title, "Add certificate", { addAtTop: true }) },
    { key: "documents", label: "Documents", def: OBJ({
      title1: T("Heading line 1"), title2: T("Heading line 2 (gradient)"), text: TA("Intro text", "", 2),
      items: LIST("PDF documents", OBJ({
        title: T("Document title"),
        category: T("Category", "Used for the filter buttons, e.g. Career, Certificates, Projects, Research"),
        description: TA("Short description", "", 2),
        date: T("Date", "Optional, e.g. Nov 2026"),
        file: { type: "pdf", label: "PDF file" }
      }), () => ({ title: "New document", category: "", description: "", date: "", file: "" }), (d) => d.title, "Add document", { addAtTop: true,
        hint: "Best way: put the PDF in the assets/docs folder (or upload it to that folder on GitHub) and type its path. Small PDFs (under 3 MB) can also be uploaded here directly." })
    }) },
    { key: "contact", label: "Contact", def: OBJ({ title1: T("Heading line 1"), title2: T("Heading line 2 (gradient)"), text: TA("Text", "", 3) }) }
  ];

  /* ---------------- State ---------------- */
  let work = clone(SITE.content);
  let dirty = false;
  let activeTab = "profile";
  const markDirty = () => { dirty = true; panel && panel.classList.add("dirty"); };
  const getAt = (path) => path.reduce((o, k) => (o == null ? undefined : o[k]), work);
  const setAt = (path, val) => {
    let o = work;
    for (let i = 0; i < path.length - 1; i++) {
      if (o[path[i]] == null) o[path[i]] = typeof path[i + 1] === "number" ? [] : {};
      o = o[path[i]];
    }
    o[path[path.length - 1]] = val;
    markDirty();
  };

  /* ---------------- Images ---------------- */
  const readFile = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
  async function compressImage(file, maxDim) {
    if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
    if (/svg|gif/.test(file.type)) return readFile(file);
    const url = URL.createObjectURL(file);
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.round(img.naturalWidth * scale), hgt = Math.round(img.naturalHeight * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = hgt;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, w, hgt);
    URL.revokeObjectURL(url);
    const keepAlpha = file.type === "image/png" && maxDim <= 600; // logos and badges
    return canvas.toDataURL(keepAlpha ? "image/png" : "image/jpeg", 0.85);
  }
  const pickFile = (accept) => new Promise((res) => {
    const inp = h("input", { type: "file", accept });
    inp.addEventListener("change", () => res(inp.files[0] || null));
    inp.click();
  });

  /* ---------------- Field renderers ---------------- */
  function field(def, path, extra = {}) {
    const wrap = h("div", { class: "ed-field" });
    const val = getAt(path);
    if (def.label) wrap.append(h("label", { class: "ed-label" }, def.label));
    let control;
    switch (def.type) {
      case "text":
        control = h("input", { class: "ed-input", type: "text", value: val ?? "" });
        control.addEventListener("input", () => { setAt(path, control.value); extra.onChange && extra.onChange(); });
        break;
      case "number":
        control = h("input", { class: "ed-input", type: "number", step: "any", value: val ?? "" });
        control.addEventListener("input", () => { setAt(path, control.value === "" ? null : Number(control.value)); extra.onChange && extra.onChange(); });
        break;
      case "color":
        control = h("input", { class: "ed-color", type: "color", value: /^#[0-9a-f]{6}$/i.test(val || "") ? val : "#818cf8" });
        control.addEventListener("input", () => setAt(path, control.value));
        break;
      case "textarea":
        control = h("textarea", { class: "ed-input", rows: def.rows || 3 });
        control.value = val ?? "";
        control.addEventListener("input", () => { setAt(path, control.value); extra.onChange && extra.onChange(); });
        break;
      case "strings":
        control = h("textarea", { class: "ed-input", rows: Math.min(Math.max((val || []).length + 1, 3), 10) });
        control.value = (val || []).join("\n");
        control.addEventListener("input", () => setAt(path, control.value.split("\n").map((s) => s.trim()).filter(Boolean)));
        break;
      case "select": {
        control = h("select", { class: "ed-input" });
        def.options.forEach(([v, l]) => control.append(h("option", { value: v, selected: v === val }, l)));
        control.addEventListener("change", () => { setAt(path, control.value); extra.onChange && extra.onChange(); });
        break;
      }
      case "icon": {
        control = h("div", { class: "ed-icons" });
        ICONS.forEach((name) => {
          const b = h("button", { type: "button", class: "ed-icon-btn" + (name === val ? " on" : ""), title: name, html: ic(name) });
          b.addEventListener("click", () => { setAt(path, name); control.querySelectorAll(".on").forEach((x) => x.classList.remove("on")); b.classList.add("on"); });
          control.append(b);
        });
        break;
      }
      case "image": control = imageField(def, path); break;
      case "pdf": control = pdfField(path); break;
      case "object": {
        control = h("div", { class: "ed-object" });
        Object.entries(def.fields).forEach(([k, d]) => control.append(field(d, [...path, k], extra)));
        break;
      }
      case "list": control = listField(def, path); break;
      case "optional": control = optionalField(def, path); break;
    }
    wrap.append(control);
    if (def.hint) wrap.append(h("p", { class: "ed-hint", html: def.hint.replace(/</g, "&lt;") }));
    return wrap;
  }

  function imageField(def, path) {
    const box = h("div", { class: "ed-image" });
    const draw = () => {
      const src = getAt(path) || "";
      box.innerHTML = "";
      const preview = h("div", { class: "ed-img-preview" + (src ? "" : " empty"), html: src ? "" : ic("camera") + "<span>No image</span>" });
      if (src) preview.append(h("img", { src, alt: "" }));
      const upload = h("button", { type: "button", class: "ed-btn", html: ic("upload") + (src ? " Replace image" : " Upload image") });
      upload.addEventListener("click", async () => {
        const file = await pickFile("image/*");
        if (!file) return;
        upload.disabled = true; upload.textContent = "Processing…";
        try { setAt(path, await compressImage(file, def.maxDim || 1400)); draw(); }
        catch (e) { alert(e.message || "Couldn't read that image."); draw(); }
      });
      const actions = h("div", { class: "ed-row" }, upload);
      if (src) {
        const rm = h("button", { type: "button", class: "ed-btn ghost", html: ic("trash") + " Remove" });
        rm.addEventListener("click", () => { setAt(path, ""); draw(); });
        actions.append(rm);
      }
      const pathInput = h("input", { class: "ed-input small", type: "text", placeholder: "…or a file path / URL, e.g. assets/photo.jpg", value: src.startsWith("data:") ? "" : src });
      pathInput.addEventListener("change", () => { setAt(path, pathInput.value.trim()); draw(); });
      box.append(preview, h("div", { class: "ed-img-side" }, actions, pathInput));
    };
    draw();
    return box;
  }

  const PDF_LIMIT = 3 * 1024 * 1024;
  function pdfField(path) {
    const box = h("div", { class: "ed-pdf" });
    const draw = () => {
      const val = getAt(path) || "";
      const embedded = val.startsWith("data:");
      box.innerHTML = "";
      const status = h("div", { class: "ed-pdf-status" + (val ? "" : " empty"), html: ic("pdf") + " " + (
        !val ? "No PDF attached"
          : embedded ? `Uploaded PDF (${Math.round((val.length * 0.75) / 1024)} KB, stored inside content.js)`
          : val.replace(/</g, "&lt;")) });
      const upload = h("button", { type: "button", class: "ed-btn", html: ic("upload") + (val ? " Replace PDF" : " Upload PDF") });
      upload.addEventListener("click", async () => {
        const file = await pickFile("application/pdf,.pdf");
        if (!file) return;
        if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) { alert("Please choose a PDF file."); return; }
        if (file.size > PDF_LIMIT) {
          alert(`"${file.name}" is ${(file.size / 1048576).toFixed(1)} MB, which is too big to store inside content.js.\n\nCopy it into the assets/docs folder (or upload it there on GitHub), then type its path here, for example:\nassets/docs/${file.name.replace(/\s+/g, "_")}`);
          return;
        }
        upload.disabled = true; upload.textContent = "Reading…";
        try { setAt(path, await readFile(file)); } catch { alert("Couldn't read that file."); }
        draw();
      });
      const actions = h("div", { class: "ed-row" }, upload);
      if (val) {
        const rm = h("button", { type: "button", class: "ed-btn ghost", html: ic("trash") + " Remove" });
        rm.addEventListener("click", () => { setAt(path, ""); draw(); });
        actions.append(rm);
      }
      const pathInput = h("input", { class: "ed-input small", type: "text", placeholder: "…or a path, e.g. assets/docs/my-file.pdf", value: embedded ? "" : val });
      pathInput.addEventListener("change", () => { setAt(path, pathInput.value.trim()); draw(); });
      box.append(status, actions, pathInput);
    };
    draw();
    return box;
  }

  function optionalField(def, path) {
    const box = h("div", { class: "ed-optional" });
    const draw = () => {
      box.innerHTML = "";
      const on = getAt(path) != null;
      const cb = h("input", { type: "checkbox", checked: on });
      cb.addEventListener("change", () => { setAt(path, cb.checked ? def.template() : null); draw(); });
      box.append(h("label", { class: "ed-check" }, cb, " " + def.toggle));
      if (!on) return;
      if (def.oneBased) {
        // Show step numbers starting at 1 while storing 0-based indexes
        const v = getAt(path);
        const mk = (label, key) => {
          const inp = h("input", { class: "ed-input", type: "number", min: 1, value: (v[key] ?? 0) + 1 });
          inp.addEventListener("input", () => setAt([...path, key], Math.max(0, Number(inp.value) - 1)));
          return h("div", { class: "ed-field" }, h("label", { class: "ed-label" }, label), inp);
        };
        box.append(h("div", { class: "ed-grid2" }, mk("From step number", "from"), mk("Back to step number", "to")));
        box.append(field(def.of.fields.label, [...path, "label"]));
      } else box.append(field(def.of, path));
    };
    draw();
    return box;
  }

  function listField(def, path, openIndex = -1) {
    const box = h("div", { class: "ed-list" });
    const draw = (open = -1) => {
      box.innerHTML = "";
      const arr = getAt(path) || [];
      const add = h("button", { type: "button", class: "ed-btn add", html: ic("plus") + " " + (def.addLabel || "Add") });
      add.addEventListener("click", () => {
        const a = getAt(path) || [];
        const item = def.template();
        if (def.addAtTop) a.unshift(item); else a.push(item);
        setAt(path, a);
        draw(def.addAtTop ? 0 : a.length - 1);
      });
      if (def.addAtTop) box.append(add);
      arr.forEach((item, i) => {
        const det = h("details", { class: "ed-item", open: i === open });
        const title = h("span", { class: "ed-item-title" }, (def.title ? def.title(item, i) : `Item ${i + 1}`) || `Item ${i + 1}`);
        const tools = h("span", { class: "ed-tools" });
        const tool = (name, label, fn, disabled) => {
          const b = h("button", { type: "button", class: "ed-tool", title: label, "aria-label": label, html: ic(name), disabled });
          b.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); fn(); });
          tools.append(b);
        };
        tool("up", "Move up", () => { arr.splice(i - 1, 0, arr.splice(i, 1)[0]); setAt(path, arr); draw(i - 1); }, i === 0);
        tool("down", "Move down", () => { arr.splice(i + 1, 0, arr.splice(i, 1)[0]); setAt(path, arr); draw(i + 1); }, i === arr.length - 1);
        tool("trash", "Delete", () => {
          if (!confirm(`Delete "${title.textContent}"?`)) return;
          arr.splice(i, 1); setAt(path, arr); draw();
        });
        det.append(h("summary", {}, title, tools));
        const body = h("div", { class: "ed-item-body" });
        det.append(body);
        // Build the form lazily when opened, and keep the title in sync
        const build = () => {
          if (body.childElementCount) return;
          body.append(field(def.item, [...path, i], { onChange: () => { title.textContent = def.title ? def.title(getAt([...path, i]), i) : title.textContent; } }));
        };
        det.addEventListener("toggle", () => det.open && build());
        if (i === open) build();
        box.append(det);
      });
      if (!arr.length) box.append(h("p", { class: "ed-hint" }, "Nothing here yet."));
      if (!def.addAtTop) box.append(add);
    };
    draw(openIndex);
    box._draw = draw;
    return box;
  }

  /* ---------------- Panel ---------------- */
  let panel, body;
  function buildPanel() {
    panel = h("aside", { class: "ed-panel", "aria-label": "Site editor" });
    const head = h("div", { class: "ed-head" },
      h("div", {}, h("strong", {}, "Edit site"), h("span", { class: "ed-dirty" }, "Unsaved changes")),
      h("div", { class: "ed-row" },
        h("button", { type: "button", class: "ed-btn ghost small", onclick: exitEditMode }, "Exit edit mode"),
        h("button", { type: "button", class: "ed-tool big", title: "Close", "aria-label": "Close editor", html: ic("x"), onclick: closePanel })));
    const tabs = h("nav", { class: "ed-tabs" });
    TABS.forEach((t) => {
      const b = h("button", { type: "button", class: "ed-tab", "data-tab": t.key }, t.label);
      b.addEventListener("click", () => showTab(t.key));
      tabs.append(b);
    });
    body = h("div", { class: "ed-body" });
    const foot = h("div", { class: "ed-foot" },
      h("button", { type: "button", class: "ed-btn primary", html: ic("check") + " Save &amp; preview", onclick: save }),
      h("button", { type: "button", class: "ed-btn", html: ic("download") + " Download content.js", onclick: download }),
      h("details", { class: "ed-more" },
        h("summary", {}, "More"),
        h("div", { class: "ed-more-menu" },
          h("button", { type: "button", class: "ed-btn ghost", html: ic("upload") + " Import content.js", onclick: importFile }),
          h("button", { type: "button", class: "ed-btn ghost danger", html: ic("refresh") + " Discard draft", onclick: discard }),
          h("button", { type: "button", class: "ed-btn ghost", html: ic("eye") + " Hide edit button on this device", onclick: forgetDevice }))),
      h("p", { class: "ed-help", html: "<b>Save &amp; preview</b> keeps changes in this browser only. To publish, <b>Download content.js</b> and replace the file of the same name in your site folder." }));
    panel.append(head, tabs, body, foot);
    document.body.append(panel);
  }

  function showTab(key, openIndex = -1) {
    activeTab = key;
    panel.querySelectorAll(".ed-tab").forEach((b) => b.classList.toggle("on", b.dataset.tab === key));
    const tab = TABS.find((t) => t.key === key);
    body.innerHTML = "";
    if (tab.def.type === "list") {
      const f = h("div", { class: "ed-field" });
      if (tab.def.hint) f.append(h("p", { class: "ed-hint top" }, tab.def.hint));
      f.append(listField(tab.def, [key], openIndex));
      body.append(f);
    } else body.append(field(tab.def, [key]));
    if (tab.extra) body.append(field(tab.extra.def, [tab.extra.key]));
    body.scrollTop = 0;
    if (openIndex >= 0) setTimeout(() => { const d = body.querySelector("details[open]"); d && d.scrollIntoView({ block: "start" }); }, 30);
  }

  function openPanel(tab = activeTab, openIndex = -1) {
    if (!panel) buildPanel();
    showTab(tab, openIndex);
    requestAnimationFrame(() => panel.classList.add("open"));
    document.body.classList.add("ed-open");
  }
  function closePanel() {
    if (dirty && !confirm("You have unsaved changes. Close without saving?")) return;
    if (dirty) { work = clone(SITE.content); dirty = false; panel.classList.remove("dirty"); }
    panel.classList.remove("open");
    document.body.classList.remove("ed-open");
  }

  /* ---------------- Actions ---------------- */
  function persist(obj) {
    try { localStorage.setItem(SITE.DRAFT_KEY, JSON.stringify(obj)); return true; }
    catch (e) {
      alert("Your browser ran out of storage for this draft (images take the most space).\n\nTry smaller images, or put image files in the assets folder and type their path instead of uploading. You can still click \"Download content.js\" to keep everything.");
      return false;
    }
  }
  function reloadInto(tab, index = -1) {
    dirty = false;
    const editing = document.body.classList.contains("edit-mode");
    if (editing) sessionStorage.setItem("pf-edit", "1");
    else tab = null;
    sessionStorage.setItem("pf-skip-intro", "1");
    sessionStorage.setItem("pf-scroll", String(window.scrollY));
    if (tab) sessionStorage.setItem("pf-edit-open", JSON.stringify({ tab, index }));
    location.reload();
  }
  function save() {
    if (!persist(work)) return;
    dirty = false;
    reloadInto(activeTab);
  }
  function fileText(obj) {
    return `/* =========================================================
   SITE CONTENT: every text, image, project, education entry and
   certificate on the portfolio comes from this file.

   Easiest way to edit: open the site with ?edit at the end of the
   address (for example index.html?edit), make your changes in the
   editor, click "Download content.js" and replace this file with it.

   Images can be uploaded in the editor (they are stored inside this
   file) or set to a path such as "assets/photo.jpg".
   ========================================================= */
window.CONTENT = ${JSON.stringify(obj, null, 2)};
`;
  }
  function download() {
    const blob = new Blob([fileText(work)], { type: "text/javascript" });
    const a = h("a", { href: URL.createObjectURL(blob), download: "content.js" });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    SITE.toast && SITE.toast("content.js downloaded. Replace the file in your site folder to publish.");
  }
  async function importFile() {
    const file = await pickFile(".js,.json,application/json,text/javascript");
    if (!file) return;
    try {
      const text = await file.text();
      const obj = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
      if (!obj.profile || !obj.projects) throw new Error();
      work = obj;
      if (persist(work)) reloadInto(activeTab);
    } catch { alert("That file doesn't look like a content.js from this site."); }
  }
  function discard() {
    if (!confirm("Discard all unpublished edits in this browser and go back to the published content.js?")) return;
    localStorage.removeItem(SITE.DRAFT_KEY);
    dirty = false;
    reloadInto(activeTab);
  }
  function exitEditMode() {
    if (dirty && !confirm("You have unsaved changes. Exit without saving?")) return;
    sessionStorage.removeItem("pf-edit");
    const url = new URL(location.href);
    url.searchParams.delete("edit");
    url.hash = url.hash === "#edit" ? "" : url.hash;
    location.href = url.toString();
  }

  /* ---------------- Draft banner (shown whenever a draft is active) ---------------- */
  if (SITE.isDraft) {
    const bar = h("div", { class: "ed-banner" },
      h("span", { html: ic("edit") + " You're viewing <b>unpublished edits</b> saved in this browser." }),
      h("span", { class: "ed-row" },
        h("button", { type: "button", class: "ed-btn small", onclick: download, html: ic("download") + " Download content.js" }),
        h("button", { type: "button", class: "ed-btn ghost small", onclick: discard }, "Discard")));
    document.body.append(bar);
    document.body.classList.add("has-banner");
  }

  /* ---------------- Edit mode ---------------- */
  const params = new URLSearchParams(location.search);
  const wantEdit = params.has("edit") || location.hash === "#edit" || sessionStorage.getItem("pf-edit") === "1";

  const OWNER_KEY = "pf-owner";
  const isOwnerDevice = () => { try { return localStorage.getItem(OWNER_KEY) === "1"; } catch { return false; } };
  function forgetDevice() {
    if (!confirm("Hide the edit button on this device? You can bring it back any time by opening the site with ?edit at the end of the address, or with the pencil icon in the footer.")) return;
    try { localStorage.removeItem(OWNER_KEY); } catch { /* ignore */ }
    dirty = false;
    exitEditMode();
  }

  function enterEditMode() {
    sessionStorage.setItem("pf-edit", "1");
    // Remember this device so the edit button shows on every visit from now on
    try { localStorage.setItem(OWNER_KEY, "1"); } catch { /* storage blocked */ }
    document.body.classList.add("edit-mode");
    // Floating button
    const fab = h("button", { type: "button", class: "ed-fab", html: ic("edit") + " Edit site" });
    fab.addEventListener("click", () => openPanel());
    document.body.append(fab);
    // An edit chip on every section
    document.querySelectorAll("[data-edit]").forEach((sec) => {
      const tab = sec.dataset.edit, idx = sec.dataset.editIndex != null ? +sec.dataset.editIndex : -1;
      const t = TABS.find((x) => x.key === tab);
      const chip = h("button", { type: "button", class: "ed-chip", html: ic("edit") + " Edit " + (idx >= 0 ? "this project" : t.label) });
      chip.addEventListener("click", () => openPanel(tab, idx));
      sec.append(chip);
    });
    // Click the portrait to change the photo straight away
    const portrait = $("#portrait");
    if (portrait) {
      portrait.classList.add("ed-photo");
      portrait.append(h("div", { class: "ed-photo-hint", html: ic("camera") + " Change photo" }));
      portrait.addEventListener("click", async () => {
        const file = await pickFile("image/*");
        if (!file) return;
        try {
          work.profile.photo = await compressImage(file, 900);
          if (persist(work)) reloadInto(null);
        } catch (e) { alert(e.message || "Couldn't read that image."); }
      });
    }
    // Reopen the panel after a save-and-reload
    const reopen = sessionStorage.getItem("pf-edit-open");
    if (reopen) {
      sessionStorage.removeItem("pf-edit-open");
      const { tab, index } = JSON.parse(reopen);
      openPanel(tab, index);
      SITE.toast && SITE.toast("Saved. Preview updated.");
    }
  }

  if (wantEdit) enterEditMode();
  else if (isOwnerDevice()) {
    // A small shortcut only on devices where the editor has been used before (never shown to visitors)
    const url = new URL(location.href);
    url.searchParams.set("edit", "");
    const owner = h("a", { class: "ed-owner", href: url.toString().replace("edit=", "edit"), title: "Open the site editor", html: ic("edit") + " Edit" });
    document.body.append(owner);
  }
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
      e.preventDefault();
      if (!document.body.classList.contains("edit-mode")) enterEditMode();
      openPanel();
    }
  });
  window.addEventListener("beforeunload", (e) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } });
})();
