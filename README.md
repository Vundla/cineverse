# Cineverse

Project Link https://cineverse-55kp.onrender.com/

Short: Movie discovery & review app (React + Vite frontend, Node/Express + Sequelize backend).

## Project structure
```
/cineverse
├─ client/                 # Vite + React frontend
│  ├─ public/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ main.tsx
│  ├─ package.json
│  └─ vite.config.ts
├─ server/                 # Express backend (ESM) + Sequelize
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ models/
│  │  ├─ routes/
│  │  └─ server.js
│  ├─ package.json
│  └─ .env                 # local only (DO NOT commit)
└─ README.md
```

## Requirements
- Node 18+ (Render uses Node; ensure compatibility)
- Local: npm
- Database: MySQL / MariaDB (managed DB recommended in production)

## Environment variables
Create a server/.env (do NOT commit). Required keys:
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_PORT
- TMDB_API_KEY
- OPENROUTER_API_KEY
- JWT_SECRET
- PORT (optional; Render provides PORT)

## Local development
1. Backend
```bash
cd server
npm install
npm run dev   # nodemon
```
2. Frontend
```bash
cd client
npm install
npm run dev   # Vite dev server (hot reload)
```

## Render deployment (recommended: two services)
- Frontend: Render Static Site
  - Build command:
    ```
    cd client && npm ci && npm run build
    ```
  - Publish directory: `client/dist`

- Backend: Render Web Service
  - Build command:
    ```
    cd server && npm ci
    ```
  - Start command:
    ```
    cd server && npm start
    ```
  - IMPORTANT: Render requires your service to bind to the PORT environment variable. See Render docs for port binding:
    https://render.com/docs/web-services#port-binding

## Single-service alternative
If you prefer one Web Service that builds the client and serves static files from the server:
- Build command:
```
cd client && npm ci && npm run build && cd ../server && npm ci
```
- Start command:
```
cd server && npm start
```
Ensure server serves `client/dist` and reads `process.env.PORT`.

## Notes
- Do not commit .env or secrets. Add/verify `.gitignore`.
- Add Render environment variables in the service dashboard (DB credentials, API keys, JWT secret).

- If you want a Render YAML or a README badge, tell me and
