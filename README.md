# HM007 HackMatrix

Empowering financial wellness with a gamified, interactive experience. Track and simulate credit scores, evaluate loan eligibility, compare products, and engage with financial literacy — all in a sleek React + Vite app.

![Status](https://img.shields.io/badge/status-active-success)
![Build](https://img.shields.io/badge/build-vite-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Table of Contents
- Overview
- Features
- Tech Stack
- Live Demo
- Quick Start
- Build & Preview
- Deployment (Render)
- Project Structure
- Architecture
- Screenshots
- Roadmap
- Contributing
- License

## Overview
HackMatrix is a modern SPA focused on financial literacy and planning. It blends calculators, interactive visuals, and gamified progression (XP, levels, achievements) to keep users engaged while learning and managing their finances.

## Features
- Credit score tracker with animated meter and history
- Credit score simulator with mock credit events
- Loan eligibility checker and EMI calculator
- Loan product comparison view
- Gamification: XP gain, level-up, achievements, splash screen
- Financial literacy modules and quiz
- Animated backgrounds and visualizations (particles, globe, mesh)

## Tech Stack
- React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- three.js for visuals
- Deployed as a Static Site on Render

## Live Demo
- Deployed URL: https://hm007-hack-matrix.onrender.com

## Documentation
- Project Report: [docs/Project Documentation 02.pdf](docs/Project%20Documentation%2002.pdf)

## Quick Start
```bash
# Clone
git clone https://github.com/ang21506/HM007_HackMatrix.git
cd HM007_HackMatrix

# Install
npm install

# Run locally
npm run dev
# Opens at http://localhost:5173/
```

## Build & Preview
```bash
# Build production assets
npm run build

# Preview optimized build
npm run preview
```

## Deployment (Render - Static Site)
- Build Command: `npm install; npm run build`
- Publish Directory: `dist`
- Config: `render.yaml` with SPA route rewrites

Steps:
1. Push changes to GitHub (`main`)
2. Create a Static Site on Render and connect the repo
3. Set Build Command and Publish Directory
4. Auto-deploys on every `git push`

## Project Structure
```
HM007_HackMatrix/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── utils/
│   │   └── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server/               # Optional backend scaffolding (Sequelize)
│   ├── index.js
│   ├── config.json
│   └── models/
├── render.yaml
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## Architecture (High-Level)
- Frontend SPA (React + Vite)
- UI modules in `src/app/components` (trackers, calculators, animations)
- Shared domain types in `src/app/types.ts`
- Core calculations/utilities in `src/app/utils`
- Optional backend scaffolding under `server/` for future expansion

## Screenshots
Recommended highlights to include:
- Dashboard Overview: [docs/screenshots/dashboard.jpeg](docs/screenshots/dashboard.jpeg)
- Loan Eligibility: [docs/screenshots/eligibility.jpeg](docs/screenshots/eligibility.jpeg)
- Credit Score Meter: [docs/screenshots/credit-meter.jpeg](docs/screenshots/credit-meter.jpeg)
- Compare Loans: [docs/screenshots/compare.jpeg](docs/screenshots/compare.jpeg)
- Achievements & XP: [docs/screenshots/achievements.jpeg](docs/screenshots/achievements.jpeg)
- Splash Screen: [docs/screenshots/splash.jpeg](docs/screenshots/splash.jpeg)
- Progress View: [docs/screenshots/progress.jpeg](docs/screenshots/progress.jpeg)

Screenshots are stored under `docs/screenshots/`.

## Roadmap
- Enhanced data persistence (localStorage/remote)
- More achievement tiers and challenges
- Accessibility and performance audits
- i18n for multi-language support

## Contributing
Pull requests are welcome. Please:
- Run `npm run build` to ensure type safety
- Keep components small and reusable
- Follow existing alias usage (`@/` resolves to `src/`)

## Team
- Omkar Nikam — [OMKAR-PSN](https://github.com/OMKAR-PSN)
- Atharva Gonde — [ang21506](https://github.com/ang21506)
- Tejaswini Burkule — [tejaswiniburkule](https://github.com/tejaswiniburkule)
- Aryan Dalvi

## License
MIT — see `LICENSE`
