# Portfolio

Personal portfolio site — a single-page site built with plain HTML, CSS,
and vanilla JavaScript (no framework), showcasing active projects rather
than a static resume.

**Live site:** https://kamdyb.github.io/blossom-s-portfolio/

## Why no framework

This is intentionally built without React/Vue/a static site generator.
The goal was a fast, dependency-free page I fully understand end to end.

## Structure
├── index.html # single page, all sections
├── portfolio.css # theme variables, layout, card styles
├── portfolio.js # theme toggle (persisted via localStorage) + smooth scroll
└── assets/ # resume PDF, profile image

## Features

- **Dark/light theme toggle**, persisted across visits via `localStorage`
- **Smooth-scroll navigation** for all in-page anchor links
- Responsive project cards linking out to individual GitHub repos

## Project descriptions — kept accurate on purpose

Each project card describes what the linked repo actually contains, not
an idealized version of it. If a description here says "in progress,"
the repo is genuinely mid-build, so the projects are not overhyped.

## What's next

- Add a live activity indicator or last-updated date per project
- Expand the football analytics card as that project grows (currently
  the most active of the three)
- Possibly add a fourth project card once a DSA-focused project is built