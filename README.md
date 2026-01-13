# Creative Economy — Dashboard

This repository contains the Creative Economy Dashboard — a lightweight React + Vite web app that centralises partnership tracking and the Creative Tech programme metrics.

## What this dashboard is

- A partnership tracker: list, create, edit, and delete partnership records (status, field, value, contact, updates).
- A Creative Tech dashboard: metrics and cohort snapshots for Creative Tech tracks (AI for creatives, Music & Audio Production, Graphic Design, Content Creation).
- Lightweight local persistence: UI state like column widths are persisted to `localStorage` for convenience during development.

## Key features

- Responsive dashboard layout with stat cards and charts.
- Resizable table columns: drag the column edges to expand; columns are compact by default.
- Compact, readable table rows with status badges and concise metadata.
- Edit modal with save and delete actions for items.
- Separate views: Dashboard, Partnerships, and Creative Tech (Selection Dashboard & Cohort snapshots).

## File highlights

- `src/App.jsx` — Main application UI, routing between views, table rendering, resizing logic, and the Create/Edit modal.
- `src/index.css` — Tailwind + custom base styles.
- `public/favicon.svg` — App favicon used in development.

## Local development

1. Install dependencies:

```bash
cd partnership-tracker
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the app in your browser (Vite will show the local URL). The Partnerships view shows the table — drag column edges to resize.

## Notes & next steps

- Column width defaults and compact table styling are intentionally set to be narrow; resizing widens columns and is persisted.
- If you want server-backed persistence, hook up an API and replace localStorage usage with fetch/axios calls.
- Accessibility improvements (keyboard resize, ARIA attributes) and touch support for resizers are available as follow-ups.

If you want, I can add a short CONTRIBUTING section or a docker-compose setup — tell me which you'd prefer next.
