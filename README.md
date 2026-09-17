# NAVI Portfolio

> A modern, minimalist portfolio site template for designers and developers — built with React + TypeScript + Vite, deployed on Vercel.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20TS%20%7C%20Vite%20%7C%20Tailwind-cyan)
![Deploy](https://img.shields.io/badge/deploy-Vercel-black)

## ✨ Features

- **Bento Grid** home page with asymmetric layout
- **Case Study** detail pages with full narrative structure
- **Admin Panel** (`/admin`) for editing projects and profile — no backend needed
- **Image upload** with base64 storage (localStorage / IndexedDB)
- **Data export/import** as JSON — easy backup & cross-device sync
- **Fully responsive** — works on mobile, tablet, and desktop
- **Framer Motion** micro-animations & scroll reveals
- **Zero backend** — 100% static, deployable anywhere

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| State | Zustand |
| Routing | React Router v7 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Storage | IndexedDB + localStorage |
| Deploy | Vercel |

## 📂 Project Structure

```
src/
├── admin/             # Admin panel pages
│   ├── AdminLayout.tsx
│   ├── AdminOverview.tsx
│   ├── AdminProjects.tsx
│   └── AdminProfile.tsx
├── components/
│   ├── Home/          # Hero, BentoGrid, Strengths, Philosophy
│   ├── Layout/        # Header, Footer
│   └── UI/            # Badge, Empty states
├── data/              # Default content (edit me!)
│   ├── projects.ts    # Portfolio projects
│   └── site.ts        # Personal info, skills, experience
├── hooks/             # useReveal, useTheme
├── pages/             # Home, Work, CaseStudy, About, Contact
├── storage/           # IndexedDB + localStorage layer
├── store/             # Zustand admin store
└── utils/             # Helpers
```

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/lmh15210100307-ui/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
# → Open http://localhost:5173

# 4. Build for production
npm run build
npm run preview
```

## 📝 How to Customize

### Option A: Admin Panel (no code needed)

Open `http://localhost:5173/admin` → edit projects, profile, and site info → Save.

### Option B: Edit source files

| What to change | File |
|---------------|------|
| Your name, bio, skills, experience | `src/data/site.ts` |
| Default portfolio projects | `src/data/projects.ts` |
| Brand colors, fonts, radius | `tailwind.config.js` |
| Page components | `src/components/**` |

## ☁️ Deploy

### Vercel (recommended, free)

1. Push to GitHub
2. Import repo on [vercel.com/new](https://vercel.com/new)
3. Framework: **Vite** (auto-detected)
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy ✅

> `vercel.json` handles SPA rewrites — already included.

### Any static host

```bash
npm run build
# Upload dist/ to Netlify, Cloudflare Pages, GitHub Pages, etc.
```

## 📤 Data Management

| Action | Where |
|--------|-------|
| Export data | `/admin` sidebar → **Export** (downloads JSON) |
| Import data | `/admin` sidebar → **Import** (upload JSON) |
| Reset to defaults | `/admin` sidebar → **Reset All** |

> 💡 **Cross-device workflow**: Export JSON on old machine → AirDrop to new machine → Import in Admin. All images (stored as base64) travel with the JSON.

## 🔐 Data Boundary: Open Source vs Private

This repository contains the full site template with **sample data**. When you deploy your own instance, your real portfolio content stays out of Git.

### What's public in this repo

- All source code (React components, routing, styling, admin panel)
- Sample projects in `src/data/projects.ts`
- Sample personal info in `src/data/site.ts`
- Framework configs (`vite.config.ts`, `tailwind.config.js`, `vercel.json`)

### What stays private on your machine

- Your real portfolio projects and case studies
- Cover images uploaded via Admin (stored as base64 in browser localStorage)
- Your real bio, skills, experience timeline
- Any custom styling you add locally before pushing to production

### How it works

```
GitHub (public template)           Your local machine
├── src/data/projects.ts           ├── Admin / real portfolio
│   └── Sample Project 1/2/3      │   └── Your 6 real cases
├── src/data/site.ts                ├── localStorage
│   └── Sample profile              │   └── Your real resume
└── UI / components                 └── Images you upload via Admin

git push  → GitHub gets UI updates + sample data
/admin    → Your local browser only (never commits to Git)
```

### Release checklist before pushing

```bash
npm run check          # TypeScript type check
git status --short     # Review what changed — no real names, URLs, or credentials
```

### Deploying your private version

UI updates → `git push` → Vercel auto-redeploys (recommended)
Content updates → Edit in `/admin` → works immediately, no deploy needed

## 📄 License

[MIT](./LICENSE) — free for personal and commercial use. Attribution appreciated but not required.

## 🙋 Support

Found a bug or want a new feature? Open an issue!
