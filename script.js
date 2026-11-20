(() => {
  "use strict";

  /* =========================================================
     CONTENT: published content.js, or a local draft from the editor
     ========================================================= */
  const DRAFT_KEY = "portfolio-content-draft-v1";
  const BASE = window.CONTENT;
  // Editor drafts are only shown in edit mode. Normal visits always show the published content.js.
  const inEditMode = new URLSearchParams(location.search).has("edit") || location.hash === "#edit" || sessionStorage.getItem("pf-edit") === "1";
  let draft = null;
  try { const raw = localStorage.getItem(DRAFT_KEY); if (raw) draft = JSON.parse(raw); } catch (e) { /* storage unavailable */ }
  const C = (inEditMode && draft) || BASE;
  window.SITE = { content: C, base: BASE, isDraft: !!(inEditMode && draft), hasDraft: !!draft, DRAFT_KEY };

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const skipIntro = sessionStorage.getItem("pf-skip-intro") === "1";
  const icon = (id, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24"><use href="#i-${id || "spark"}"/></svg>`;
  const pad = (n) => String(n).padStart(2, "0");
  const attr = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const has = (v) => v !== undefined && v !== null && String(v).trim() !== "";
  const list = (a) => (Array.isArray(a) ? a : []);
  const initials = (name) => String(name || "").split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const slug = (s) => String(s || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "project";

  const P = C.profile || {};
  const nameParts = String(P.name || "").trim().split(/\s+/);
  const lastName = nameParts.length > 1 ? nameParts.pop() : "";
  const firstName = nameParts.join(" ");

  const head = (num, eyebrow, t1, t2, lead) => `
    <div class="section-head">
      <span class="eyebrow reveal">${num} · ${eyebrow}</span>
      <h2 class="section-title">
        <span class="split-line" data-split><span>${t1 || ""}</span></span>
        ${has(t2) ? `<span class="split-line" data-split><span style="--d:.1s" class="grad-text">${t2}</span></span>` : ""}
      </h2>
      ${has(lead) ? `<p class="section-lead reveal">${lead}</p>` : ""}
    </div>`;

  const countHTML = (m) => `${m.pre || ""}<span data-count="${Number(m.v) || 0}" data-dec="${m.dec || 0}"${Number(m.v) >= 1000 ? " data-sep" : ""}>0</span>${m.suf || ""}`;

  /* =========================================================
     RENDER
     ========================================================= */
  // Nav, preloader, footer
  $("#preloader-mark").innerHTML = initials(P.name).split("").map((c) => `<span>${c}</span>`).join("");
  $("#logo").innerHTML = `<span class="logo-mark">${initials(P.name)}</span><span>${P.name || ""}</span>`;
  $("#logo").setAttribute("aria-label", `${P.name}, home`);
  $("#nav-resume").href = P.resume || "#";
  $("#footer-name").textContent = P.name || "";
  $("#footer-loc").textContent = P.location || "";
  $("#year").textContent = new Date().getFullYear();

  // Hero
  const socials = `
    ${has(P.github) ? `<a class="social" href="${attr(P.github)}" target="_blank" rel="noopener" aria-label="GitHub">${icon("github")}</a>` : ""}
    ${has(P.linkedin) ? `<a class="social" href="${attr(P.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin")}</a>` : ""}
    ${has(P.email) ? `<a class="social" href="mailto:${attr(P.email)}" aria-label="Email">${icon("mail")}</a>` : ""}`;
  const tags = list(P.floatingTags).slice(0, 4).map((t, i) => `<span class="float-tag ft${i + 1}">${t}</span>`).join("");
  $("#hero-content").innerHTML = `
    <div class="hero-grid">
      <div class="hero-main">
        ${has(P.badge) ? `<div class="hero-badge reveal"><span class="pulse"></span> ${P.badge}</div>` : ""}
        <h1>
          <span class="split-line" data-split><span style="--d:.1s">${firstName}</span></span>
          ${lastName ? `<span class="split-line" data-split><span class="grad-text" style="--d:.22s">${lastName}.</span></span>` : ""}
        </h1>
        <p class="hero-role reveal" style="--d:.35s">${P.typedPrefix || ""} <span class="typed" id="typed"></span><span class="caret"></span></p>
        <p class="hero-summary reveal" style="--d:.45s">${P.summary || ""}</p>
        <div class="hero-actions reveal" style="--d:.55s">
          <a href="#projects" class="btn btn-primary magnetic">Explore my work ${icon("arrow", "arrow")}</a>
          ${has(P.resume) ? `<a href="${attr(P.resume)}" class="btn btn-ghost magnetic" download>${icon("download")} Download resume</a>` : ""}
          <div class="socials">${socials}</div>
        </div>
      </div>
      <div class="portrait-wrap reveal-scale" style="--d:.3s" id="portrait">
        <div class="portrait-ring"></div>
        <div class="portrait">
          ${has(P.photo) ? `<img src="${attr(P.photo)}" alt="Photo of ${attr(P.name)}" />` : `<div class="portrait-ph"><span>${initials(P.name)}</span></div>`}
        </div>
        ${tags}
      </div>
    </div>
    <div class="hero-stats reveal" style="--d:.7s">
      ${list(P.stats).map((s) => `<div class="hero-stat"><strong>${countHTML(s)}</strong><span>${s.label || ""}</span></div>`).join("")}
    </div>`;
  $(".hero-stats").style.setProperty("--cols", Math.min(list(P.stats).length || 1, 4));

  // About
  const A = C.about || {};
  $("#about-content").innerHTML = `
    <div class="about-grid">
      <div>
        <span class="eyebrow reveal">01 · About</span>
        <h2 class="section-title">
          <span class="split-line" data-split><span>${A.title1 || ""}</span></span>
          <span class="split-line" data-split><span style="--d:.1s" class="grad-text">${A.title2 || ""}</span></span>
        </h2>
        ${has(A.photo) ? `<div class="about-photo reveal"><img src="${attr(A.photo)}" alt="${attr(P.name)}" loading="lazy" /></div>` : ""}
        <div class="about-text">${list(A.paragraphs).map((p, i) => `<p class="reveal" style="--d:${i * 0.08}s">${p}</p>`).join("")}</div>
      </div>
      <div class="principles">
        ${list(A.principles).map((p, i) => `
          <div class="principle reveal-scale" style="--d:${0.05 + i * 0.07}s">
            <div class="ic">${icon(p.icon)}</div>
            <div><h4>${p.title || ""}</h4><p>${p.text || ""}</p></div>
          </div>`).join("")}
      </div>
    </div>`;

  // Experience
  $("#experience-content").innerHTML = `
    ${head("02", "Experience", "Where I've shipped.")}
    <div class="timeline" id="timeline">
      <div class="timeline-fill" id="timeline-fill"></div>
      ${list(C.experience).map((x) => `
        <div class="t-item reveal">
          <span class="t-dot"></span>
          <div class="t-card">
            <div class="t-head">
              <div class="t-title">${has(x.logo) ? `<img class="t-logo" src="${attr(x.logo)}" alt="" />` : ""}<h3>${x.company || ""}</h3></div>
              <span class="t-date">${x.dates || ""}</span>
            </div>
            <p class="t-role">${x.role || ""}</p>
            ${list(x.bullets).length ? `<ul class="t-list">${list(x.bullets).map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
            ${list(x.metrics).length ? `<div class="t-metrics metrics-anim">${list(x.metrics).map((m) => `<div class="t-metric"><strong>${countHTML(m)}</strong><span>${m.label || ""}</span></div>`).join("")}</div>` : ""}
          </div>
        </div>`).join("")}
    </div>`;

  // Education
  const ring = (score, max) => {
    const pct = Math.max(0, Math.min(1, Number(score) / (Number(max) || 10)));
    const r = 42, circ = 2 * Math.PI * r;
    return `<svg class="score-ring" viewBox="0 0 100 100" style="--circ:${circ.toFixed(1)};--off:${(circ * (1 - pct)).toFixed(1)}">
      <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5eead4"/><stop offset="1" stop-color="#818cf8"/></linearGradient></defs>
      <circle cx="50" cy="50" r="${r}" class="track"/><circle cx="50" cy="50" r="${r}" class="bar"/></svg>`;
  };
  $("#education-content").innerHTML = `
    ${head("03", "Education", "Foundations.")}
    <div class="edu-grid">
      ${list(C.education).map((e, i) => {
        const scored = has(e.score) && !isNaN(Number(e.score));
        return `
        <article class="edu-card reveal" style="--d:${i * 0.1}s">
          <div class="edu-top">
            <span class="tag ${i === 0 ? "live" : "resume"}">${e.level || "Education"}</span>
            ${has(e.years) ? `<span class="t-date">${e.years}</span>` : ""}
          </div>
          <div class="edu-body">
            <div class="edu-info">
              ${has(e.logo) ? `<img class="edu-logo" src="${attr(e.logo)}" alt="" />` : `<div class="edu-ic">${icon("cap")}</div>`}
              <h3>${e.degree || ""}</h3>
              <p class="edu-school">${e.school || ""}</p>
              ${has(e.location) ? `<p class="edu-loc">${icon("pin")} ${e.location}</p>` : ""}
            </div>
            ${scored ? `
              <div class="edu-score">
                ${ring(e.score, e.scoreMax)}
                <div class="score-val"><strong><span data-count="${Number(e.score)}" data-dec="${Number(e.scoreMax) > 10 ? 0 : 1}">0</span></strong><span>/ ${e.scoreMax || 10}</span><em>${e.scoreLabel || "Score"}</em></div>
              </div>` : ""}
          </div>
          ${has(e.details) ? `<p class="edu-details">${e.details}</p>` : ""}
        </article>`;
      }).join("")}
    </div>`;

  // Projects
  const projects = list(C.projects).map((p, i) => ({ ...p, id: has(p.id) ? p.id : slug(p.title) + "-" + i }));
  const statusTag = {
    live: '<span class="tag live">Public on GitHub</span>',
    wip: '<span class="tag wip">In active development</span>',
    resume: '<span class="tag resume">Professional project</span>'
  };
  const flowHTML = (flow) => {
    const steps = list(flow && flow.steps);
    if (!steps.length) return "";
    const nodes = steps.map((s, i) => {
      const node = `<div class="flow-node" data-i="${i}">
          <div class="n-ic">${icon(s.icon)}</div>
          <div class="n-step">STEP ${pad(i + 1)}</div>
          <h5>${s.t || ""}</h5><p>${s.s || ""}</p>
        </div>`;
      return i < steps.length - 1 ? node + '<div class="flow-link"><i></i></div>' : node;
    }).join("");
    const L = flow.loop;
    const loopOK = L && has(L.label) && L.from in steps && L.to in steps;
    const loop = loopOK
      ? `<div class="flow-loop" data-from="${L.from}" data-to="${L.to}"><div class="loop-line"></div><span class="loop-label">${L.label}</span></div>
         <div class="flow-loop-mobile">${L.label}</div>`
      : "";
    return `
      <div class="flow-card reveal" data-flow>
        <div class="flow-head"><h4>Architecture flow</h4><span class="flow-legend"><i></i> data path</span></div>
        <div class="flow${steps.length > 7 ? " dense" : ""}">${nodes}</div>${loop}
      </div>`;
  };

  $("#projects-content").innerHTML = `
    ${head("04", "Projects", "Systems I've built,", "end to end.", "Each project has its own slide: the problem, the architecture flow, how it works step by step, the design decisions behind it, and the measured results.")}
    <div class="p-index" id="p-index">
      ${projects.map((p, i) => `
        <a class="p-card reveal tilt${has(p.image) ? " has-img" : ""}" style="--d:${(i % 3) * 0.08}s" href="#${attr(p.id)}">
          ${has(p.image) ? `<div class="p-thumb"><img src="${attr(p.image)}" alt="" loading="lazy" /></div>` : ""}
          <div class="p-card-top"><span class="p-num">${pad(i + 1)} / ${pad(projects.length)}</span>${statusTag[p.status] || ""}</div>
          <h3>${p.title || "Untitled project"}</h3>
          <p>${p.short || ""}</p>
          <span class="go">View case study ${icon("arrow")}</span>
        </a>`).join("")}
    </div>`;

  $("#project-slides").innerHTML = projects.map((p, i) => {
    const n = pad(i + 1), prev = projects[i - 1], next = projects[i + 1];
    const btns = [
      has(p.repo) ? `<a class="btn btn-primary magnetic" href="${attr(p.repo)}" target="_blank" rel="noopener">${icon("github")} View source on GitHub</a>` : "",
      has(p.demo) ? `<a class="btn btn-ghost magnetic" href="${attr(p.demo)}" target="_blank" rel="noopener">${icon("ext")} Live demo</a>` : ""
    ].join("");
    const links = btns
      ? `<div class="p-links">${btns}</div>`
      : `<p class="p-note">Built as a professional project. The source isn't public, but I'm happy to walk through the architecture in an interview.</p>`;
    const metrics = list(p.metrics);
    return `
      <section class="p-slide" id="${attr(p.id)}" style="--glow:${attr(p.glow || "#818cf8")}" data-edit="projects" data-edit-index="${i}">
        <div class="p-slide-bg"></div>
        <div class="p-big-num" aria-hidden="true">${n}</div>
        <div class="container">
          <div class="p-meta reveal">
            <span class="p-counter mono"><b>${n}</b> / ${pad(projects.length)} · Case study</span>
            ${statusTag[p.status] || ""}
          </div>
          <h2 class="p-title"><span class="split-line" data-split><span>${p.title || ""}</span></span></h2>
          <p class="p-tagline reveal">${p.tagline || ""}</p>

          ${has(p.image) ? `
            <figure class="p-shot reveal-scale">
              <div class="p-shot-bar"><i></i><i></i><i></i><span>${p.imageCaption || p.title || ""}</span></div>
              <img src="${attr(p.image)}" alt="${attr(p.imageCaption || p.title)}" loading="lazy" />
            </figure>` : ""}

          <div class="p-top${metrics.length ? "" : " no-metrics"}">
            <div class="ps-cards">
              ${has(p.problem) ? `<div class="ps-card problem reveal-left"><h4>${icon("zap")} The problem</h4><p>${p.problem}</p></div>` : ""}
              ${has(p.solution) ? `<div class="ps-card solution reveal-left" style="--d:.1s"><h4>${icon("check")} The solution</h4><p>${p.solution}</p></div>` : ""}
            </div>
            ${metrics.length ? `<div class="metrics reveal-scale metrics-anim" style="--d:.15s">${metrics.map((m) => `<div class="metric"><strong>${countHTML(m)}</strong><span>${m.label || ""}</span></div>`).join("")}</div>` : ""}
          </div>

          ${flowHTML(p.flow)}

          <div class="p-bottom">
            ${list(p.how).length ? `<div class="p-col reveal"><h4>How it works</h4><ol class="steps">${list(p.how).map((h) => `<li>${h}</li>`).join("")}</ol></div>` : ""}
            ${list(p.decisions).length ? `<div class="p-col reveal" style="--d:.08s"><h4>Engineering decisions</h4><div class="decisions">${list(p.decisions).map((d) => `<div class="decision"><h5>${d.t || ""}</h5><p>${d.d || ""}</p></div>`).join("")}</div></div>` : ""}
            <div class="p-col reveal" style="--d:.16s">
              <h4>Tech stack</h4>
              <div class="chips">${list(p.stack).map((s) => `<span class="chip">${s}</span>`).join("")}</div>
              ${links}
            </div>
          </div>

          <div class="p-nav">
            ${prev ? `<a href="#${attr(prev.id)}">${icon("arrow", "flip")} ${prev.title}</a>` : `<a href="#projects">${icon("arrow", "flip")} All projects</a>`}
            ${next ? `<a href="#${attr(next.id)}">${next.title} ${icon("arrow")}</a>` : `<a href="#beyond">Beyond the code ${icon("arrow")}</a>`}
          </div>
        </div>
      </section>`;
  }).join("");

  $("#dots").innerHTML = projects.map((p, i) => `<a href="#${attr(p.id)}" aria-label="${attr(p.title)}"><span>${pad(i + 1)} · ${p.title}</span></a>`).join("");

  // Beyond the code
  const B = C.beyond || {};
  const fieldSVG = `
    <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" aria-label="Illustration of a sunrise over a growing crop field" role="img">
      <defs>
        <radialGradient id="sunG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fde68a"/><stop offset="0.6" stop-color="#fbbf77"/><stop offset="1" stop-color="#fbbf77" stop-opacity="0"/></radialGradient>
        <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f3a26"/><stop offset="1" stop-color="#13261a"/></linearGradient>
        <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b4a2c"/><stop offset="1" stop-color="#1b2f1c"/></linearGradient>
        <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2f1a"/><stop offset="1" stop-color="#1f190e"/></linearGradient>
      </defs>
      <g class="sun"><circle cx="330" cy="170" r="90" fill="url(#sunG)" opacity="0.55"/><circle cx="330" cy="170" r="34" fill="#fde68a"/></g>
      <g class="cloud" opacity="0.18"><ellipse cx="60" cy="70" rx="46" ry="12" fill="#fff"/><ellipse cx="88" cy="62" rx="28" ry="12" fill="#fff"/></g>
      <g class="cloud" opacity="0.12" style="animation-duration: 58s; animation-delay: -20s"><ellipse cx="40" cy="110" rx="36" ry="9" fill="#fff"/></g>
      <path d="M0 230 Q 90 180 190 215 T 380 205 T 500 220 V400 H0z" fill="url(#hill1)"/>
      <path d="M0 260 Q 120 225 250 255 T 500 250 V400 H0z" fill="url(#hill2)"/>
      <path d="M0 290 H500 V400 H0z" fill="url(#soil)"/>
      <g id="stalks"></g>
    </svg>`;
  const photos = list(B.photos).filter((ph) => has(ph.src));
  $("#beyond-content").innerHTML = `
    <div class="beyond-hero">
      <div>
        <span class="eyebrow reveal">05 · Beyond the code</span>
        <h2 class="section-title">
          <span class="split-line" data-split><span>${B.title1 || ""}</span></span>
          <span class="split-line" data-split><span style="--d:.1s; color: var(--leaf)">${B.title2 || ""}</span></span>
        </h2>
        ${list(B.paragraphs).map((p, i) => `<p class="reveal" style="--d:${i * 0.08}s">${p}</p>`).join("")}
      </div>
      <div class="field-scene reveal-scale${has(B.sceneImage) ? " has-img" : ""}" id="field-scene">
        ${has(B.sceneImage) ? `<img src="${attr(B.sceneImage)}" alt="${attr(B.sceneCaption || "Farming")}" />` : fieldSVG}
        ${has(B.sceneCaption) ? `<span class="scene-caption">${B.sceneCaption}</span>` : ""}
      </div>
    </div>
    <div class="life-grid">
      ${list(B.cards).map((c, i) => `
        <div class="life-card ${c.tone === "warm" ? "warm" : c.tone === "cool" ? "cool" : ""} reveal" style="--d:${(i % 3) * 0.1}s">
          <div class="ic">${icon(c.icon)}</div>
          <h3>${c.title || ""}</h3>
          <p>${c.text || ""}</p>
        </div>`).join("")}
    </div>
    ${photos.length ? `
      <div class="gallery">
        ${photos.map((ph, i) => `
          <figure class="g-item reveal-scale" style="--d:${(i % 4) * 0.08}s">
            <img src="${attr(ph.src)}" alt="${attr(ph.caption || "")}" loading="lazy" />
            ${has(ph.caption) ? `<figcaption>${ph.caption}</figcaption>` : ""}
          </figure>`).join("")}
      </div>` : ""}
    ${has(B.quote) ? `<p class="quote reveal">${B.quote}</p>` : ""}`;

  // Skills
  $("#skills-content").innerHTML = `
    ${head("06", "Skills", "The toolkit.")}
    <div class="skills-grid">
      ${list(C.skills).map((g, i) => `
        <div class="skill-group reveal" style="--d:${(i % 2) * 0.08}s">
          <h4>${icon(g.icon)} ${g.group || ""}</h4>
          <div class="chips">${list(g.items).map((s) => `<span class="chip">${s}</span>`).join("")}</div>
        </div>`).join("")}
    </div>`;
  const mq = list(C.marquee);
  $("#marquee").innerHTML = mq.concat(mq).map((m) => `<span>${m}</span>`).join("");
  if (!mq.length) $(".marquee").style.display = "none";

  // Certifications
  $("#certs-content").innerHTML = `
    ${head("07", "Credentials", "Certifications.")}
    <div class="certs">
      ${list(C.certifications).map((c, i) => {
        const tag = has(c.url) ? "a" : "div";
        const href = has(c.url) ? ` href="${attr(c.url)}" target="_blank" rel="noopener"` : "";
        return `
        <${tag} class="cert reveal" style="--d:${(i % 3) * 0.08}s"${href}>
          ${has(c.image) ? `<img class="cert-img" src="${attr(c.image)}" alt="" loading="lazy" />` : `<div class="ic">${icon("award")}</div>`}
          <h4>${c.title || ""}</h4>
          <p>${c.issuer || ""}${has(c.date) ? ` · ${c.date}` : ""}</p>
          ${has(c.url) ? `<span class="link">Verify credential ${icon("ext")}</span>` : ""}
        </${tag}>`;
      }).join("")}
    </div>`;

  // Documents
  const D = C.documents || {};
  const docs = list(D.items).filter((d) => has(d.title) || has(d.file));
  const editing = new URLSearchParams(location.search).has("edit") || sessionStorage.getItem("pf-edit") === "1";
  const docCats = [...new Set(docs.map((d) => d.category).filter(has))];
  if (!docs.length && !editing) {
    $("#documents").remove();
    const link = $('#nav-links a[href="#documents"]');
    if (link) link.parentElement.remove();
  } else {
    $("#documents-content").innerHTML = `
      ${head("08", "Documents", D.title1 || "Documents", D.title2, D.text)}
      ${docCats.length > 1 ? `
        <div class="doc-filters reveal" role="tablist">
          <button class="doc-filter on" data-cat="">All <span>${docs.length}</span></button>
          ${docCats.map((c) => `<button class="doc-filter" data-cat="${attr(c)}">${c} <span>${docs.filter((d) => d.category === c).length}</span></button>`).join("")}
        </div>` : ""}
      <div class="doc-grid">
        ${docs.length ? docs.map((d, i) => `
          <article class="doc-card reveal" style="--d:${(i % 3) * 0.08}s" data-cat="${attr(d.category || "")}">
            <div class="doc-icon">${icon("pdf")}<span>PDF</span></div>
            <div class="doc-info">
              <div class="doc-meta">${has(d.category) ? `<span class="tag resume">${d.category}</span>` : ""}${has(d.date) ? `<span class="t-date">${d.date}</span>` : ""}</div>
              <h3>${d.title || "Untitled document"}</h3>
              ${has(d.description) ? `<p>${d.description}</p>` : ""}
            </div>
            ${has(d.file) ? `
              <div class="doc-actions">
                <button class="btn btn-ghost btn-sm" data-doc="${i}">${icon("eye")} View</button>
                <a class="btn btn-ghost btn-sm" data-doc-dl="${i}">${icon("download")} Download</a>
              </div>` : `<p class="doc-missing">No file attached yet.</p>`}
          </article>`).join("") : `<p class="doc-empty">No documents yet. Use the editor's Documents tab to add one.</p>`}
      </div>`;
  }

  // Contact
  const K = C.contact || {};
  $("#contact-content").innerHTML = `
    <span class="eyebrow reveal">09 · Contact</span>
    <h2>
      <span class="split-line" data-split><span>${K.title1 || ""}</span></span>
      <span class="split-line" data-split><span style="--d:.1s" class="grad-text">${K.title2 || ""}</span></span>
    </h2>
    <p class="reveal">${K.text || ""}</p>
    <div class="contact-actions reveal">
      ${has(P.email) ? `<a class="btn btn-primary magnetic" href="mailto:${attr(P.email)}">${icon("mail")} Email me</a>` : ""}
      ${has(P.linkedin) ? `<a class="btn btn-ghost magnetic" href="${attr(P.linkedin)}" target="_blank" rel="noopener">${icon("linkedin")} LinkedIn</a>` : ""}
      ${has(P.github) ? `<a class="btn btn-ghost magnetic" href="${attr(P.github)}" target="_blank" rel="noopener">${icon("github")} GitHub</a>` : ""}
    </div>
    ${has(P.email) ? `<button class="email-big reveal" id="copy-email" title="Click to copy">${P.email}</button>` : ""}`;

  /* =========================================================
     ANIMATION & INTERACTION
     ========================================================= */
  const toastEl = $("#toast");
  const toast = (msg) => { toastEl.textContent = msg; toastEl.classList.add("show"); setTimeout(() => toastEl.classList.remove("show"), 2000); };
  window.SITE.toast = toast;

  // Preloader
  let typingStarted = false;
  const finishLoad = () => {
    $("#preloader").classList.add("done");
    document.body.classList.remove("loading");
    $$("#hero .reveal, #hero .reveal-scale, #hero [data-split]").forEach((el) => el.classList.add("in"));
    startTyping();
  };
  if (reduceMotion || skipIntro) { sessionStorage.removeItem("pf-skip-intro"); finishLoad(); }
  else {
    if (document.readyState === "complete") setTimeout(finishLoad, 650);
    else window.addEventListener("load", () => setTimeout(finishLoad, 650));
  }
  setTimeout(() => { if (document.body.classList.contains("loading")) finishLoad(); }, 3500);

  // Typed roles
  function startTyping() {
    if (typingStarted) return;
    typingStarted = true;
    const el = $("#typed");
    const words = list(P.typedRoles).filter(has);
    if (!el || !words.length) return;
    if (reduceMotion) { el.textContent = words[0]; return; }
    let w = 0, c = 0, deleting = false;
    const tick = () => {
      const word = words[w];
      el.textContent = word.slice(0, c);
      if (!deleting && c < word.length) { c++; setTimeout(tick, 45 + Math.random() * 40); }
      else if (!deleting) { deleting = true; setTimeout(tick, 1800); }
      else if (c > 0) { c--; setTimeout(tick, 22); }
      else { deleting = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
    };
    tick();
  }

  // Counters
  const animateCount = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.dec || "0", 10);
    const sep = el.hasAttribute("data-sep");
    const fmt = (v) => (sep ? Math.round(v).toLocaleString("en-US") : v.toFixed(dec));
    if (reduceMotion) { el.textContent = fmt(target); return; }
    const dur = 1600, start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - t, 4)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Reveal observer
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("in");
      $$("[data-count]", el).forEach(animateCount);
      if (el.hasAttribute("data-flow")) runFlow(el);
      revealIO.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  $$(".reveal, .reveal-left, .reveal-scale, [data-split], .metrics-anim, [data-flow], #field-scene")
    .filter((el) => !el.closest("#hero"))
    .forEach((el) => revealIO.observe(el));

  // Hero counters
  const heroStats = $(".hero-stats");
  const waitHero = setInterval(() => {
    if (document.body.classList.contains("loading")) return;
    clearInterval(waitHero);
    setTimeout(() => $$("[data-count]", heroStats).forEach(animateCount), 500);
  }, 100);

  // Flow diagrams
  function positionLoop(card) {
    const loop = $(".flow-loop", card);
    if (!loop) return;
    const flow = $(".flow", card);
    const isRow = getComputedStyle(flow).flexDirection === "row";
    loop.classList.toggle("show", isRow);
    if (!isRow) return;
    const nodes = $$(".flow-node", card);
    const a = nodes[+loop.dataset.to].getBoundingClientRect();
    const b = nodes[+loop.dataset.from].getBoundingClientRect();
    const base = flow.getBoundingClientRect();
    const x1 = Math.min(a.left, b.left) + Math.min(a.width, b.width) / 2 - base.left;
    const x2 = Math.max(a.left, b.left) + Math.max(a.width, b.width) / 2 - base.left;
    $(".loop-line", loop).style.left = x1 + "px";
    $(".loop-line", loop).style.width = x2 - x1 + "px";
    $(".loop-label", loop).style.left = x1 + (x2 - x1) / 2 + "px";
  }
  const flowCards = () => $$("[data-flow]");
  window.addEventListener("resize", () => flowCards().forEach(positionLoop));
  if (document.fonts) document.fonts.ready.then(() => flowCards().forEach(positionLoop));
  flowCards().forEach(positionLoop);

  function runFlow(card) {
    positionLoop(card);
    const nodes = $$(".flow-node", card), links = $$(".flow-link", card), loop = $(".flow-loop", card);
    if (reduceMotion) { nodes.forEach((n) => n.classList.add("done")); links.forEach((l) => l.classList.add("on")); return; }
    let i = 0, visible = true;
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(card);
    const step = () => {
      if (!visible) { setTimeout(step, 600); return; }
      nodes.forEach((n, k) => { n.classList.toggle("lit", k === i); n.classList.toggle("done", k < i); });
      links.forEach((l, k) => l.classList.toggle("on", k < i));
      if (i === nodes.length - 1) {
        if (loop) { loop.classList.remove("pulse-on"); void loop.offsetWidth; loop.classList.add("pulse-on"); }
        setTimeout(() => {
          nodes.forEach((n) => n.classList.remove("lit", "done"));
          links.forEach((l) => l.classList.remove("on"));
          i = 0;
          setTimeout(step, 700);
        }, 2600);
        return;
      }
      i++;
      setTimeout(step, 750);
    };
    step();
  }

  // Hero neural canvas
  (function heroCanvas() {
    const canvas = $("#hero-canvas");
    const ctx = canvas.getContext("2d");
    let w, h, dpr, pts = [], raf;
    const mouse = { x: -9999, y: -9999 };
    const colors = ["94,234,212", "129,140,248", "240,171,252"];
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((w * h) / 14000), 110);
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.6, c: colors[Math.floor(Math.random() * colors.length)]
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const maxD = 140;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.hypot(dxm, dym);
        if (dm < 160 && dm > 0) { p.x += (dxm / dm) * 0.8; p.y += (dym / dm) * 0.8; }
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < maxD) {
            ctx.strokeStyle = `rgba(${p.c},${(1 - d / maxD) * 0.22})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${p.c},0.85)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.parentElement.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });
    if (reduceMotion) { draw(); cancelAnimationFrame(raf); return; }
    new IntersectionObserver((es) => {
      cancelAnimationFrame(raf);
      if (es[0].isIntersecting) draw();
    }).observe(canvas);
  })();

  // Field scene crops
  (function buildField() {
    const g = $("#stalks");
    if (!g) return;
    const ns = "http://www.w3.org/2000/svg";
    const rows = [{ y: 300, n: 22, h: 40, s: 0.6 }, { y: 335, n: 18, h: 62, s: 0.85 }, { y: 380, n: 14, h: 90, s: 1.1 }];
    rows.forEach((row, ri) => {
      for (let k = 0; k < row.n; k++) {
        const x = (k + 0.5) * (500 / row.n) + (Math.random() - 0.5) * 8;
        const hgt = row.h * (0.85 + Math.random() * 0.3);
        const outer = document.createElementNS(ns, "g");
        outer.setAttribute("class", "stalk");
        outer.style.setProperty("--sd", (ri * 0.35 + k * 0.04).toFixed(2) + "s");
        const sway = document.createElementNS(ns, "g");
        sway.setAttribute("class", "sway");
        sway.style.setProperty("--sw", (-Math.random() * 4).toFixed(2) + "s");
        const shade = ["#4d7c3a", "#5f9145", "#86b05a"][ri], grain = ["#a8a34a", "#c9b458", "#e3c766"][ri];
        sway.innerHTML = `
          <path d="M${x} ${row.y} Q ${x + 2} ${row.y - hgt / 2} ${x} ${row.y - hgt}" stroke="${shade}" stroke-width="${1.6 * row.s}" fill="none"/>
          <path d="M${x} ${row.y - hgt * 0.35} q ${-10 * row.s} ${-6 * row.s} ${-16 * row.s} ${-2 * row.s}" stroke="${shade}" stroke-width="${1.4 * row.s}" fill="none"/>
          <path d="M${x} ${row.y - hgt * 0.55} q ${10 * row.s} ${-6 * row.s} ${16 * row.s} ${-2 * row.s}" stroke="${shade}" stroke-width="${1.4 * row.s}" fill="none"/>
          <ellipse cx="${x}" cy="${row.y - hgt - 7 * row.s}" rx="${3 * row.s}" ry="${9 * row.s}" fill="${grain}"/>`;
        outer.appendChild(sway);
        g.appendChild(outer);
      }
    });
  })();

  // Scroll-linked UI
  const nav = $("#nav"), progress = $("#progress"), dots = $("#dots");
  const navLinks = $$("#nav-links a");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const slides = $$(".p-slide");
  const dotLinks = $$("#dots a");
  const tlFill = $("#timeline-fill"), timeline = $("#timeline");
  let lastY = window.scrollY, ticking = false;
  const onScroll = () => {
    const y = window.scrollY, vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("scrolled", y > 30);
    nav.classList.toggle("hidden", y > lastY && y > 500 && !document.body.classList.contains("menu-open"));
    lastY = y;
    let current = "";
    sections.forEach((s) => { if (s.getBoundingClientRect().top < vh * 0.4) current = s.id; });
    const first = slides[0], last = slides[slides.length - 1];
    const inSlides = !!first && first.getBoundingClientRect().top < vh * 0.5 && last.getBoundingClientRect().bottom > vh * 0.5;
    if (inSlides) current = "projects";
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
    dots.classList.toggle("show", inSlides);
    let active = -1;
    slides.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * 0.5) active = i; });
    dotLinks.forEach((d, i) => d.classList.toggle("active", i === active));
    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const pct = Math.min(Math.max((vh * 0.6 - r.top) / r.height, 0), 1);
      tlFill.style.height = pct * (r.height - 16) + "px";
    }
    if (!reduceMotion) {
      $$(".p-big-num").forEach((el) => {
        el.style.transform = `translateY(${(el.parentElement.getBoundingClientRect().top * -0.15).toFixed(1)}px)`;
      });
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  // Mobile menu
  const menuBtn = $("#menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  navLinks.forEach((a) => a.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
  }));

  // Pointer effects (desktop only)
  if (finePointer && !reduceMotion) {
    const glow = $("#cursor-glow");
    let gx = 0, gy = 0, tx = 0, ty = 0;
    window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    const loopGlow = () => {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx - 260}px, ${gy - 260}px)`;
      requestAnimationFrame(loopGlow);
    };
    loopGlow();
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
    $$(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
        card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  } else {
    $("#cursor-glow").style.display = "none";
  }

  // Copy email
  const copyBtn = $("#copy-email");
  if (copyBtn) copyBtn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(P.email); toast("Email copied to clipboard"); }
    catch { window.location.href = "mailto:" + P.email; }
  });

  // Documents: filters, viewer and downloads
  const blobCache = {};
  const docURL = (i) => {
    const f = docs[i].file;
    if (!String(f).startsWith("data:")) return f;
    if (!blobCache[i]) {
      // Embedded PDFs are turned into blob URLs so browsers will display them
      const [meta, b64] = f.split(",");
      const bytes = Uint8Array.from(atob(b64), (ch) => ch.charCodeAt(0));
      blobCache[i] = URL.createObjectURL(new Blob([bytes], { type: (meta.match(/data:([^;]+)/) || [])[1] || "application/pdf" }));
    }
    return blobCache[i];
  };
  const docName = (i) => slug(docs[i].title) + ".pdf";
  $$("[data-doc-dl]").forEach((a) => {
    const i = +a.dataset.docDl;
    a.addEventListener("click", () => { a.href = docURL(i); a.download = docName(i); });
    if (!String(docs[i].file).startsWith("data:")) { a.href = docs[i].file; a.download = docName(i); }
  });
  $$(".doc-filter").forEach((btn) => btn.addEventListener("click", () => {
    $$(".doc-filter").forEach((b) => b.classList.toggle("on", b === btn));
    const cat = btn.dataset.cat;
    $$(".doc-card").forEach((card) => { card.hidden = !!cat && card.dataset.cat !== cat; });
  }));
  const viewer = $("#viewer"), frame = $("#viewer-frame");
  let lastFocus = null;
  const closeViewer = () => {
    viewer.hidden = true;
    frame.src = "about:blank";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  };
  $$("[data-doc]").forEach((btn) => btn.addEventListener("click", () => {
    const i = +btn.dataset.doc, url = docURL(i);
    // Phones usually can't show PDFs inside a page, so open them directly
    if (!finePointer || window.innerWidth < 700) { window.open(url, "_blank", "noopener"); return; }
    lastFocus = btn;
    $("#viewer-title").textContent = docs[i].title || "Document";
    $("#viewer-open").href = url;
    $("#viewer-download").href = url;
    $("#viewer-download").download = docName(i);
    frame.src = url;
    viewer.hidden = false;
    document.body.style.overflow = "hidden";
    $(".viewer-close").focus();
  }));
  $$("[data-close]", viewer).forEach((el) => el.addEventListener("click", closeViewer));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !viewer.hidden) closeViewer(); });

  // Restore scroll position after an editor save
  const savedY = sessionStorage.getItem("pf-scroll");
  if (savedY) { sessionStorage.removeItem("pf-scroll"); window.scrollTo({ top: +savedY, behavior: "instant" }); }
})();
