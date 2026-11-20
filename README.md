# Diwakar Reddy · Portfolio

Personal portfolio of **Diwakar Reddy**, Applied AI Engineer working on production RAG pipelines, multi-agent systems with LangGraph, NL-to-SQL and LLM evaluation.

**Live site:** https://diwakarreddy11.github.io

The site is plain HTML, CSS and JavaScript, with no framework and no build step. All content lives in one data file, and a built-in visual editor lets me update it without touching code.

---

## Features

- **One case-study slide per project.** Each covers the problem, the solution, animated metrics, an animated architecture flow diagram (with feedback-loop arrows), how it works, engineering decisions and the tech stack.
- **Motion design.** Preloader, interactive neural-network canvas, typing effect, scroll reveals, count-up numbers, card tilt, magnetic buttons and a scroll progress bar. All motion respects `prefers-reduced-motion`.
- **Personal section.** "Beyond the code" has an animated farm-field illustration (crops grow as you scroll) and an optional photo gallery.
- **Education** with animated score rings, plus **certifications** with verification links.
- **Documents library.** PDFs grouped by category, with filters, an in-page viewer and downloads.
- **Built-in editor.** Add projects, upload photos and PDFs, and edit any text in the browser.
- Responsive from 360 px phones to wide desktops, with no horizontal scrolling.

## Project structure

```
├── index.html      Page skeleton. Every section is filled in from content.js
├── content.js      ALL site content: text, projects, education, certificates, documents, images
├── script.js       Renders content.js into the page and runs the animations
├── styles.css      Design system, layout and animations
├── editor.js       In-browser content editor (only active in edit mode)
├── editor.css      Editor styles
├── edit.html       Shortcut that opens the site in edit mode
└── assets/
    ├── Diwakar_Reddy_Resume.pdf
    └── docs/       PDFs shown in the Documents section
```

## Editing the content

1. Open the site with `?edit` at the end of the address (for example `index.html?edit`), or open `edit.html`, or press **Ctrl + Shift + E**.
2. Click **Edit site**, or the **Edit** button on any section.
3. Make your changes and click **Save & preview**. The draft is stored in your browser only.
4. Click **Download content.js** and replace `content.js` in this repo. Commit and push, and the live site updates.

Content is in `content.js` and can also be edited by hand. It is a single JavaScript object, `window.CONTENT`.

### Adding a new project

In the editor: **Projects → Add new project**. Fill in the title, summary, links, screenshot, results, architecture flow steps, how it works, decisions and stack. Reorder projects with the arrows.

### Adding PDFs

1. Put the PDF in `assets/docs/`. On GitHub you can use **Add file → Upload files** inside that folder.
2. In the editor: **Documents → Add document**. Set the title, category and description, and set the file to `assets/docs/<file-name>.pdf`.

Small PDFs (under 3 MB) can also be uploaded directly in the editor. They are then stored inside `content.js`.

> This repository is public, so anything in `assets/` can be seen by anyone. Only add documents you are happy to share.

### Images

You can upload images in the editor: profile photo, project screenshots, farm photos, logos and badges. They are resized automatically and stored inside `content.js`. For many or large photos, put them in `assets/` and reference the path instead, for example `assets/farm-1.jpg`.

## Running locally

Open `index.html` in a browser. For the closest match to the live site, serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deployment

The site is hosted on **GitHub Pages** from the `main` branch root. Every push to `main` redeploys it automatically.

---

© Diwakar Reddy · [LinkedIn](https://www.linkedin.com/in/diwakar-reddy-a46508236/) · [GitHub](https://github.com/DiwakarReddy11)
