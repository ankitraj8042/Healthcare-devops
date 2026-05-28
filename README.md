# Healthcare DevOps

## Overview
Healthcare appointment booking prototype with a working authentication flow and a React UI.

## Current status
- Auth API is complete (signup/login with JWT).
- Frontend flows exist for home, login, signup, and dashboard.
- Dashboard uses mock appointment data (no appointments API yet).
- No CI/CD, Docker, or deployment configuration yet.

## Tech stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt.
- Frontend: React + Vite, React Router, ESLint.

## Project structure
- backend/ contains the Express API and auth routes.
- frontend/ contains the React app.

## Getting started

### Backend
1. cd backend
2. npm install
3. (Optional) create a .env file with the variables below
4. npm run dev

### Frontend
1. cd frontend
2. npm install
3. npm run dev

## Environment variables

Backend (.env)
- PORT (default: 5000)
- MONGO_URI (default: mongodb://localhost:27017/healthcare_auth)
- JWT_SECRET (default: dev_secret)
- CORS_ORIGIN (default: http://localhost:5173)

Frontend (.env)
- VITE_API_URL (default: http://localhost:5000)

## API endpoints
- POST /api/auth/signup
- POST /api/auth/login

## Frontend routes
- /
- /login
- /signup
- /dashboard

## Notes
- Dashboard currently uses mock data and only checks for a token in localStorage.
- Replace mock data with real appointments APIs when available.