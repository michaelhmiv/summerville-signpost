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

### Environments
- **Dev:** https://signpost-dev.exe.xyz/ (auto-deployed on push)
- **Prod:** https://signpost-prod.exe.xyz/ (manual deploy)

### Manual Deploy to Production

```bash
# One-command deploy
./deploy.sh
```

Or manually:
```bash
# Build frontend
npm run build

# Deploy to production VM
cd backend && NODE_ENV=production npm start
```

### SSH Setup (First Time)

1. Get your SSH key from [exe.dev dashboard](https://exe.dev)
2. Add to `~/.ssh/config`:
```
Host exe.dev
    HostName exe.dev
    User git
    IdentityFile ~/.ssh/exe_dev_key
```
3. Test: `ssh exe.dev ls`

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
# Deployment test Fri Jan 30 22:02:20 UTC 2026
