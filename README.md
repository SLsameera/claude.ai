# claude.ai

This repository hosts project assets for Claude-based automation demos.

## Documentation

- [E City Era – Smart Era Marketplace (English Translation)](docs/e-city-era-report-en.md)

## Getting started

The project includes an Express API and a Vite/React frontend that surfaces a launch dashboard for the E City Era platform.

### Prerequisites

- Node.js 18+

### Run the backend

```bash
cd backend
npm install
npm run dev
```

The API listens on `http://localhost:4000` by default.

### Run the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will print the local URL (usually http://localhost:5173). The frontend expects the backend at `http://localhost:4000`; override with `VITE_API_URL` if needed.
