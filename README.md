project and that its full stack write it at CineVerse: The Enhanced Movie Discovery Platform
CineVerse is a modern, full-stack web application designed for discovering and exploring movies. Built with a professional MERN-style stack (MySQL, Express, React, Node.js), it provides a seamless, highly performant user experience. The application fetches real-time data from The Movie Database (TMDB) API and features a custom, dark-themed UI inspired by modern streaming platforms.

Live Application of frontend Link: https://cineverse-client.onrender.com
Live Application of backend Link: https://cineverse-p4b1.onrender.com

Super God Level Features
Real-Time Movie Data: Integrates directly with the TMDB API to serve up-to-the-minute popular movies, search results, and details.

Dynamic Search & Filtering: Features a powerful, real-time search bar and a dynamic genre filtering system that allows users to instantly discover movies.

Instant Trailer Playback: Users can click on any movie poster to immediately launch the official YouTube trailer in a sleek, full-screen modal, creating a seamless and engaging user experience.

Professional UI/UX: A custom-designed "diamond ruby" dark theme, built with Tailwind CSS, ensures a polished and visually appealing interface. The layout is fully responsive and modern.

Scalable Architecture: The backend is built with a professional service-oriented architecture, separating concerns for API calls, database logic, and routing, making the application robust and easy to maintain.

Ready for Deployment: The entire application is configured for a professional cloud deployment on platforms like Render, with environment variables for secure key management and a CORS policy for seamless frontend-backend communication.

Technology Stack
Backend:

Runtime: Node.js

Framework: Express.js

Database: MariaDB / MySQL

ORM: Sequelize

API Communication: Axios

Frontend:

Library: React (with Vite)

Styling: Tailwind CSS

Routing: React Router

API Communication: Axios

Deployment:

Backend: Render (Web Service)

Frontend: Render (Static Site)

Database: Cloud-hosted MySQL/MariaDB (e.g., Aiven, Railway)

Local Setup & Installation
To run this project on your local machine, follow these steps:

1. Clone the Repository

git clone [https://github.com/Vundla/cineverse.git](https://github.com/Vundla/cineverse.git)
cd cineverse


2. Configure Backend

Navigate to the server directory: cd server

Create a .env file and populate it with your database credentials and API keys (see server/.env.example).

Install dependencies: npm install

Start the server: npm run dev (runs on http://localhost:5001)

3. Configure Frontend

Navigate to the client directory in a new terminal: cd client

Install dependencies: npm install

Start the client: npm run dev (runs on http://localhost:5173)

You can now access the application in your browser at http://localhost:5173.

# Cineverse

Project Link 

$$ Frontend (Client) Link: https://cineverse-client.onrender.com

$$ Backend (Server)  Link: https://cineverse-p4b1.onrender.com

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




