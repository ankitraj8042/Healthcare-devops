# Healthcare DevOps Project

## Overview
Simple healthcare appointment booking app with authentication and basic
appointment management. Backend is Node.js + Express + MongoDB, frontend is
React + Vite.

## Features
- User signup and login with JWT.
- Create appointments (patient, doctor, date).
- View all appointments.
- Update appointment status to completed.
- Basic dashboard UI.

## Tech stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt.
- Frontend: React + Vite, React Router, ESLint.

## Project structure
- backend/ contains the Express API.
- frontend/ contains the React app.

## Requirements
- Node.js 18+
- MongoDB (local or Atlas)

## Setup

### Backend
1. cd backend
2. npm install
3. Copy .env.example to .env and update values
4. npm run dev

### Frontend
1. cd frontend
2. npm install
3. npm run dev

## Environment variables

Backend (.env)
- PORT (default: 5000)
- MONGO_URI (MongoDB connection string)
- JWT_SECRET (random secret string)
- CORS_ORIGIN (default: http://localhost:5173)

Frontend (.env)
- VITE_API_URL (default: http://localhost:5000)

## API endpoints

Auth
- POST /api/auth/signup
- POST /api/auth/login

Appointments
- POST /api/appointments
- GET /api/appointments
- PUT /api/appointments/:id (body: { "status": "completed" })

## Manual testing
1. Start backend and frontend.
2. Sign up and log in.
3. Create an appointment.
4. Verify the appointment appears in the list.
5. Click "Mark as Completed" and verify status changes.
6. Refresh the page to confirm data persists.

## Docker
1. Build and start everything: `docker compose up --build`
2. Frontend: http://localhost:3000
3. Backend: http://localhost:5000

## Notes
- Appointment logic is intentionally simple (no scheduling rules).
- Use a local MongoDB instance or MongoDB Atlas.
