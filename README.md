# Blossom — Portfolio

A personal portfolio built with React, TypeScript, and Vite. The design uses a restrained grey-and-blue palette, detailed project cards, smooth anchor navigation, and subtle scroll-triggered typography.

**Live site:** https://kamdyb.github.io/blossom-s-portfolio/

## Stack

- React + TypeScript + Vite
- Custom CSS for responsive layout, button states, and lightweight motion
- Intersection Observer for scroll reveals and letter-by-letter heading entrances
- No animation framework or 3D dependency

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deployment

The project is hosted on GitHub Pages. Vite's base path is configured as `/blossom-s-portfolio/`. The GitHub Actions workflow builds the site and publishes `dist/` on pushes to `main`; branch work is not published to the production Pages site.

## Content accuracy

Project cards explain the question behind each project, what was built, and its current status. Sinopia is an evolving MVP; Focus Wall is in development. Football Data Sentinel's 573-to-551 record count refers to a recorded data-cleaning run, not a general performance claim. No usage totals or unmeasured performance claims are presented.

## Structure

- `src/App.tsx` — portfolio sections, project cards, and motion components
- `src/styles.css` — visual system, responsive styles, and reduced-motion support
- `vite.config.ts` — GitHub Pages base path
- `.github/workflows/deploy.yml` — static build and deployment workflow
