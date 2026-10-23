# Blossom — Portfolio

A React + TypeScript portfolio with a small interactive “micro-compiler” index. Selecting a code line changes the rendered panel; the project section can be viewed through Founder, Builder, and Designer lenses.

**Live site:** https://kamdyb.github.io/blossom-s-portfolio/

## Stack

- React + TypeScript + Vite
- Custom CSS for layout, typography, responsive behaviour, and reduced-motion support
- No animation framework or 3D dependency; the first version keeps motion lightweight and the site static-host friendly

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deployment

The site is hosted as a GitHub Pages project site. Vite's base path is configured as `/blossom-s-portfolio/`. The GitHub Actions workflow builds the site and publishes `dist/` on pushes to `main`; branch work is not published to the production Pages site.

## Content accuracy

Projects are described according to their current state. Sinopia is an evolving MVP; Focus Wall is in development. Football Data Sentinel's 573-to-551 record count refers to a recorded data-cleaning run, not a general performance claim. No usage totals, Lighthouse scores, or unmeasured performance claims are presented.

## Structure

- `src/App.tsx` — portfolio sections, compiler interaction, modes, and type playground
- `src/styles.css` — visual system and responsive styles
- `vite.config.ts` — GitHub Pages base path
- `.github/workflows/deploy.yml` — static build and deployment workflow
