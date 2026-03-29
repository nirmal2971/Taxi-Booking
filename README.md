# 🚖 Taxi Booking Platform (PERN Stack)

A full-stack Taxi Booking System built using the PERN stack (PostgreSQL, Express, React, Node.js).  
This project includes a complete customer booking flow, admin panel, and backend system with authentication and fare calculation.

---

## 📌 Features

### 👤 Customer
- Search trip (pickup, drop, distance)
- View available vehicles
- Get fare estimate
- Book a ride
- Receive booking confirmation with ID

### 🛠️ Admin
- Secure login (role-based access)
- Add vehicles (name, type, pricing)
- View all bookings

### ⚙️ Backend
- RESTful APIs
- JWT-based authentication
- Role-based authorization
- Centralized error handling
- Clean modular architecture

---

## 🧱 Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- Axios

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- JSON Web Token (JWT)

---


## 🧠 Architecture Decisions

### 1. Modular Monolith
The backend is structured as a modular monolith with separate modules for auth, booking, vehicle, and fare to ensure scalability and maintainability.

### 2. Fare Calculation
Fare logic is implemented in the backend service: fare = baseFare + (distance × perKmRate)
This ensures consistency and prevents client-side manipulation.

### 3. Authentication
JWT-based authentication is used:
- Token generated during login
- Stored in localStorage
- Sent via Axios interceptor
- Verified using middleware

### 4. Role-Based Access
- USER → Booking access
- ADMIN → Vehicle management + bookings
- Enforced via middleware and frontend routing

### 5. Database Design
Tables:
- User
- Vehicle
- Booking

Relations:
- Booking → User (userId)
- Booking → Vehicle (vehicleId)

---
