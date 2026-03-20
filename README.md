# Halyn (Halal Product Scanner) — Fullstack Monorepo

A full-stack web platform that lets users scan product barcodes or paste ingredient text, then returns a rule-based "halal / haram / doubtful / unknown" analysis. Authenticated users can view and manage their scan history.

## What it does

- Barcode scanning (QR/Barcode reader on the landing page)
- Manual barcode input
- Ingredient-text scanning (manual input; analyzed in real time)
- Halal status analysis based on keyword and E-number rules
- Scan history for authenticated users (past scans + delete)
- "Popular scans" leaderboard (top products by scan count)
- Local auth (email/password) + Google OAuth
- Request protection with Arcjet (shield + bot detection + sliding window rate limiting)
- Backend can serve the built frontend in production

## Repo Structure

- `frontend/`: React (Vite) single-page app
- `backend/`: Express + MongoDB API

## Tech Stack & Key Decisions

### Frontend

- React + TypeScript (Vite)
- React Router (`react-router`)
- Zustand for client state (`useAuthStore`, `useScanStore`)
- Axios with cookies (`withCredentials: true`) for cookie-based JWT auth
- Tailwind CSS v4 + daisyUI
- QR scanner: `@yudiel/react-qr-scanner`
- UI notifications: `react-hot-toast`

### Backend

- Express (TypeScript)
- MongoDB + Mongoose
- JWT stored in an `HttpOnly` cookie (`jwt`)
- Google OAuth 2.0 via Passport
- Request protection with Arcjet:
  - `shield({ mode: "LIVE" })`
  - bot detection
  - `slidingWindow({ max: 100, interval: 60 })` rate limiting
- External product enrichment:
  - OpenFoodFacts API (`world.openfoodfacts.org/api/v2/product/:barcode`)

## How It’s Implemented (High Level)

### Authentication (Cookie JWT)

- `POST /auth/signup`: validates input, hashes the password with `bcryptjs`, creates a user, and sets the JWT cookie.
- `POST /auth/login`: verifies credentials and sets the JWT cookie.
- `POST /auth/logout`: clears the `jwt` cookie.
- `GET /auth/check` (protected): verifies the JWT cookie and returns the current user (password excluded).
- Google OAuth:
  - `GET /auth/google`: starts OAuth flow
  - `GET /auth/google/callback`: sets the JWT cookie and redirects to `CLIENT_URL/auth/google/success`
  - Frontend `GoogleSuccess` page calls `checkAuth()` and then navigates home.

**Cookie settings**

- `httpOnly: true`
- `sameSite: "strict"`
- `secure: ENV.NODE_ENV === "development" ? false : true`

### Scanning & Analysis

#### 1) Barcode scanning: `POST /scan/barcode`

Input:

- `{ "barcode": "3017624010701" }` (12 or 13 numeric digits)

Flow:

- If a `Product` for this barcode already exists:
  - Increment `Product.scanCount`
  - If the user is authenticated and this barcode hasn't been recorded yet for them, create a `ScanHistory` entry
  - Return the product document
- If it does not exist:
  - Fetch product data from OpenFoodFacts
  - Run `analyzeIngredients()` over the ingredient text
  - Create a new `Product` document (including analysis output)
  - If the user is authenticated, create a `ScanHistory` entry

#### 2) Ingredient text scanning: `POST /scan/ingredients`

Input:

- `{ "ingredientsText": "pork wine ..." }`

Flow:

- Validates that the input looks like an ingredient list (heuristics like signal words, separators, E-number patterns, etc.)
- Runs `analyzeIngredients()`
- Returns:
  - `halalStatus`
  - `analysisReasons`
  - `reasonExplanation`
- Note: This endpoint performs analysis, but does not create a complete persistent history record that includes the analysis result.

### Scan History & Popular Scans

#### Scan history: `GET /scan/past-scans` (protected)

- Returns scan history entries for the current user.
- Each entry is `ScanHistory` with `productId` populated (so you can render name, ingredients, etc.).

#### Delete a scan: `DELETE /scan/delete-scan/:id` (protected)

- Deletes a `ScanHistory` document by id.

#### Popular products: `GET /scan/popular`

- Returns the top 3 `Product` documents sorted by `scanCount` (descending).

## Request Protection (Arcjet)

Arcjet middleware is applied to:

- `backend/src/routes/auth.route.ts` (via `router.use(arcjetProtection)`)
- `backend/src/routes/scan.route.ts` (after `optionalAuth`, via `router.use(arcjetProtection)`)

In practice, these endpoints can return:

- `429` if the sliding-window rate limit is exceeded
- `403` for bot detection/spoofed bots

## Deployment Model

In production (`NODE_ENV === "production"`), the backend serves the built frontend:

- Serves `frontend/dist` static files
- Falls back to `frontend/dist/index.html` for all non-API routes

## API Quick Reference

### Auth

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/check`
- `GET /auth/google`
- `GET /auth/google/callback`

### Scanning

- `POST /scan/barcode`
- `POST /scan/ingredients`
- `GET /scan/past-scans` (protected)
- `GET /scan/popular`
- `DELETE /scan/delete-scan/:id` (protected)

## Environment Variables

### Backend (`backend/.env`)

Create `backend/.env`:

```env
PORT=3000
NODE_ENV=development

# Must be the frontend origin (for CORS). Example: http://localhost:5173
BASE_URL=http://localhost:5173

# Must be the frontend origin (used for redirects). Example: http://localhost:5173
CLIENT_URL=http://localhost:5173

MONGODB_URI=mongodb://127.0.0.1:27017/halyn
JWT_SECRET=change_me

ARCJET_KEY=...
ARCJET_ENV=...

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

### Frontend (`frontend/.env`)

Create `frontend/.env`:

```env
VITE_BASE_URL=http://localhost:3000
```

## Running Locally

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

### Optional: Build

```bash
npm run build
```

The root `build` script builds both `frontend` and `backend`.

## Known Limitations / Notes

- `sameSite: "strict"` cookies can cause issues if the frontend/backend are hosted on different sites in production.
- Ingredient-text scanning does not currently create a fully consistent persistent scan-history entry that can be re-rendered like barcode scans.
- There are no automated tests (unit/integration/e2e) in this repo.

