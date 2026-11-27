# LogiTrack API

![Status](https://img.shields.io/badge/status-work%20in%20progress-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue)
![Fastify](https://img.shields.io/badge/Fastify-5.x-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)
![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748)

RESTful API for logistics yard, dock allocation, and shipment dispatch management. Built with **TypeScript**, **Fastify**, **Prisma**, and **PostgreSQL**, following **Clean Architecture** and **SOLID** principles.

> 🚧 **Work in Progress:** Core backend domain, RBAC authentication, and unit test suite are implemented. Integration tests, Dockerfile, and React/TypeScript frontend are currently in development.

---

## Architecture & Engineering Highlights

- **Decoupled Domain & Infrastructure:** Domain entities (`User`, `Dock`, `Shipment`), repository interfaces, and cryptography abstractions (`Hasher`) are completely isolated from Prisma and `bcryptjs`.
- **RBAC & Stateless Auth:** JWT authentication (`@fastify/jwt`) with role-based access control (`ADMIN` and `OPERATOR` middlewares).
- **Business Rules Enforcement:** Prevents double-booking occupied or under-maintenance docks upon shipment check-in, automatically frees docks upon shipment dispatch, and validates cargo types (`GENERAL`, `REFRIGERATED`, `HAZARDOUS`, `FRAGILE`, `BULK`).
- **Fast Unit Testing:** Use cases are tested in isolation against in-memory repositories using **Vitest**, alongside end-to-end HTTP test scripts via **Hurl** (`requests/`).
- **Strict Runtime Validation:** Request bodies, query params, and environment variables validated with **Zod**.

---

## Tech Stack

- **Runtime & Framework:** Node.js, TypeScript, Fastify
- **Database & ORM:** PostgreSQL 16, Prisma ORM
- **Validation & Security:** Zod, JWT, bcryptjs
- **Testing & Tooling:** Vitest, Hurl, Docker Compose, tsx

---

## Getting Started

### Prerequisites
- Node.js (v20+)
- Docker & Docker Compose

### 1. Clone and install dependencies
```bash
git clone https://github.com/lucasrodlima/logitrack-api.git
cd logitrack-api
npm install
```

### 2. Configure environment variables
Copy the example environment file and set your local values:
```bash
cp .env.example .env
```

### 3. Start PostgreSQL and run migrations
```bash
docker compose up -d
npx prisma migrate deploy
```

### 4. Start the development server
```bash
npm run dev
```
The API will be available at `http://localhost:3333` (health check at `GET /health`).

---

## Running Tests

Run the unit test suite:
```bash
npm test
```

*(Optional)* Run automated HTTP flow tests using [Hurl](https://hurl.dev/) with the server running:
```bash
hurl --test requests/setup.hurl
hurl --test requests/shipments.hurl
```

---

## API Endpoints

### Health & Auth
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | API health check |
| `POST` | `/users` | Public | Register a new user (`ADMIN` or `OPERATOR`) |
| `POST` | `/sessions` | Public | Authenticate and receive a JWT |
| `GET` | `/me` | Authenticated | Get current authenticated user profile |

### Docks
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/docks` | Authenticated | List all docks and their current status |
| `POST` | `/docks` | `ADMIN` only | Register a new loading dock |

### Shipments
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/shipments` | Authenticated | Check-in a shipment and mark target dock as `OCCUPIED` |
| `GET` | `/shipments` | Authenticated | List shipments with pagination (`page`, `perPage`) and filters (`status`, `cargoType`) |
| `PATCH` | `/shipments/:id/dispatch` | Authenticated | Dispatch a shipment (`IN_TRANSIT`) and release its dock (`AVAILABLE`) |
