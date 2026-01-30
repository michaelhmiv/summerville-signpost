# Summerville Signpost

A community hub for Summerville, SC locals — connecting residents with happy hour deals, local spots, and neighborhood events.

## Features

- 🍹 **Happy Hour Directory** — Curated local spots with deals and times
- 🗺️ **Interactive Map** — Mapbox-powered neighborhood clustering
- 💬 **Community Reviews** — Share experiences and ratings
- 📅 **Local Events** — Discover what's happening in town
- 🎨 **Southern Aesthetic** — Pastel mint, dusty rose, pale butter, soft sage, and cream

## Project Structure

```
summerville-signpost/
├── frontend/          # React + Vite + TypeScript + Tailwind
├── backend/           # Express API + SQLite
├── data/              # Database schema & seed data
└── README.md
```

## Quick Start

```bash
# Install dependencies
npm install

# Start development servers
npm run dev          # Starts both frontend and backend

# Or separately
npm run dev:frontend
npm run dev:backend
```

## Deployment (exe.dev)

```bash
# Development VM
npm run build
cd backend && npm start

# Production VM
npm run build:prod
cd backend && NODE_ENV=production npm start
```

## Environment Variables

Copy `.env.example` to `.env` and configure:
- `MAPBOX_ACCESS_TOKEN` — Your Mapbox token
- `JWT_SECRET` — For auth tokens
- `PORT` — Backend port (default: 3001)

## Tech Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Mapbox GL JS
- **Backend:** Express, SQLite, JWT auth
- **Data:** SQLite with 20+ researched happy hour spots
- **Deployment:** exe.dev with dev → prod workflow

---
*Built for Summerville, SC* 🌸
