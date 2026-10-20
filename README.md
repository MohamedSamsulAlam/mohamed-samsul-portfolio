# Mohamed Samsul Alam K — Developer Portfolio

A responsive single-page developer portfolio built with **React**, **Vite**, and **CSS**. The layout uses a dark neon aesthetic (laptop workspace hero, blue/purple accents) with an optional light theme, sidebar navigation, and resume-driven content for the Datheon internship portfolio task.

## Project overview

This site presents profile information, skills, work experience, education, featured projects, resume download, and contact details in one scrollable page. Static assets (`hero.png`, `about.png`, `resume.pdf`) live in the `public/` folder and are served at the site root.

## Features

- **Dark / light theme toggle** — switches the full UI via `data-theme` on `<html>`; preference is saved in `localStorage` (`portfolio-theme`).
- **Responsive sidebar navigation** — fixed sidebar on desktop; slide-in menu with overlay on tablet/mobile.
- **Smooth scrolling** — nav links and in-page buttons scroll to section IDs with `scrollIntoView({ behavior: 'smooth' })`.
- **Active section highlighting** — sidebar item updates while scrolling (`IntersectionObserver`).
- **Project details modal** — click a featured project card to open details; close with the **X** button, backdrop click, or **Escape**.
- **Resume & contact** — PDF download and `mailto:` / social links open correctly.
- **FLAVOUR live demo** — opens [https://flavour-food-ordering.onrender.com/](https://flavour-food-ordering.onrender.com/) in a new tab from the project modal.

## Technology stack

| Layer | Tools |
| --- | --- |
| UI | React 18 |
| Build | Vite 6 |
| Icons | lucide-react |
| Styling | Custom CSS (no UI framework) |

## Project structure

```
samsul/
├── public/
│   ├── hero.png          # Laptop / workspace hero background
│   ├── about.png         # About section background
│   └── resume.pdf        # Downloadable resume
├── src/
│   ├── App.jsx           # Page sections, theme, nav, modal logic
│   ├── main.jsx          # React entry + initial theme attribute
│   └── styles.css        # Layout, themes, responsive rules, modal
├── index.html
├── package.json
└── README.md
```

## Installation

1. Open a terminal in the `samsul` folder (where `package.json` is located).
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL printed by Vite (typically `http://localhost:5173/`).

## Production build

```bash
npm run build
npm run preview
```

`npm run build` outputs an optimized site to `dist/`, including files from `public/`. Use `npm run preview` to serve the production build locally before deployment.

## How to test each requirement

| Requirement | How to verify |
| --- | --- |
| Theme toggle | Click **Light** / **Dark** in the top toolbar; refresh the page — theme should persist. |
| Mobile menu | Resize below ~850px width; open/close with the menu button, overlay tap, sidebar **X**, or **Escape**. |
| Smooth scroll | Use sidebar links (Home, About, Skills, etc.); page should scroll smoothly to each section. |
| Project modal | Click a project card under **Featured Projects**; close with **X**, outside click, or **Escape**. |
| Responsive layout | Check mobile (~375px), tablet (~768px), laptop (~1024px), and desktop (1280px+). |
| FLAVOUR link | Open FLAVOUR from the modal; confirm URL and new tab behavior. |
| Resume | **Download Resume** in hero and resume section should download `resume.pdf`. |
| Contact | **Get In Touch**, email links, phone `tel:`, GitHub, and LinkedIn should open as expected. |

## Deployment

Build the project with `npm run build`, then deploy the **`dist`** folder to any static host (for example Netlify, Vercel, GitHub Pages, or similar).

Typical settings:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

This repository does not include a live deployment URL. After you connect your own Git remote and hosting account, set the publish directory to `dist` and run the build on each release.

## Files changed for this task

- **`src/App.jsx`** — Theme state, smooth scroll handlers, mobile overlay, project modal, active nav tracking, toolbar controls.
- **`src/styles.css`** — Light/dark CSS variables, modal and overlay styles, responsive toolbar, overflow fixes, clickable project cards.
- **`src/main.jsx`** — Applies saved theme before first paint to reduce flash.
- **`README.md`** — This documentation.

## License / usage

Personal portfolio project for internship submission. Update content in `src/App.jsx` and replace assets in `public/` as your experience grows.
