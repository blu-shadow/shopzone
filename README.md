# ShopZone — Prototype & Starters

This repository contains:

- A polished static prototype (`index.html`) with accessibility and UX enhancements and an Express backend (dev mock).
- React (Vite) starter that uses the backend API.
- Vue (Vite) starter that uses the backend API.
- Netlify/Vercel helper config for one-click deployment.

Important: The backend included is a minimal Express mock for local development. It stores data in a file under `server/data.json`. This is for prototyping only — do not use it for production.

Quick start (full stack local)

1. Clone the repo
   ```bash
   git clone https://github.com/blu-shadow/shopzone.git
   cd shopzone
   ```
2. Install dependencies for the backend and start it:
   ```bash
   cd server
   npm install
   npm run dev
   ```
   The backend runs on http://localhost:4000 and exposes `/api/products` and `/api/cart`.

3. Serve the static prototype or run a frontend starter (React/Vue):

Static prototype

- Open `index.html` in a browser, or serve with a static server. If the backend runs on port 4000, the static prototype will use `/api` proxied to the backend if you open it from a local server.

React starter

```bash
cd react-starter
npm install
npm run dev
```

Vue starter

```bash
cd vue-starter
npm install
npm run dev
```

One-click deploy notes

- Netlify/Vercel configs are included. After you push this repo, replace the example one-click links in this README (if you want) or use the provider's import flow.

One-click deploy (import this repository)

- Netlify: https://app.netlify.com/start/deploy?repository=https://github.com/blu-shadow/shopzone
- Vercel:  https://vercel.com/new/clone?repository-url=https://github.com/blu-shadow/shopzone

Security reminder: the included backend is a simple dev mock. Do not store secrets or production data here.
