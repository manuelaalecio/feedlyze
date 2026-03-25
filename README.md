## 📌 Feedlyze

**Feedlyze** is a feedback board + public roadmap platform: authenticated users can **submit feedback**, **vote** on ideas, and **track status** (under review → planned → in progress → completed). Admin users can **manage** feedback and **update statuses**.

- **What problem it solves**: centralizes community ideas, helps prioritization through voting, and increases transparency through a public roadmap.
- **Who it’s for**: product/engineering teams and communities that need to collect and prioritize suggestions.

---

## 🚀 Tech stack

- **Next.js 16 (App Router)** (`app/`)
- **React 19**
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM** (with `@prisma/adapter-pg`)
- **Clerk** (authentication + UI, with middleware)
- **Tailwind CSS v4**
- **shadcn/ui** + **Radix UI**
- **Sonner** (toasts)
- **date-fns** (date formatting)
- **ESLint (Next config)**

---

## 📡 Features (based on the code)

- **Authentication** via Clerk
  - Signed-out users can browse, but actions like creating feedback and voting require sign-in.
- **User sync in the database** (Clerk → Postgres)
  - On layout render (`app/layout.tsx`), the current user is synced/updated in the database.
  - **Possible behavior**: the **first user** created in the database becomes **admin** automatically; subsequent users become **user**.
- **Feedback**
  - Feedback listing with author, category, votes, and status (`/feedback`)
  - Feedback creation via form (`/feedback/new` → `POST /api/feedback`)
- **Voting**
  - Toggle vote (vote/unvote) (`POST /api/votes`)
  - Client UI with optimistic updates
- **Roadmap**
  - Kanban-like view by status with aggregated metrics (`/roadmap`)
- **Admin**
  - Dashboard to list feedback and edit statuses (`/admin`)
  - Status update via `PATCH /api/feedback/:id/status` (admin-only)

---

## 📂 Project structure

High-level overview of the most important folders/files:

- **`app/`**: Next.js routes and pages (App Router)
  - **`app/page.tsx`**: landing page
  - **`app/feedback/page.tsx`**: feedback list
  - **`app/feedback/new/page.tsx`**: new feedback form (client component)
  - **`app/roadmap/page.tsx`**: roadmap by status
  - **`app/admin/page.tsx`**: admin dashboard
  - **`app/api/`**: API routes (server)
    - **`app/api/feedback/route.ts`**: feedback `GET` + `POST`
    - **`app/api/feedback/[id]/status/route.ts`**: status `PATCH` (admin)
    - **`app/api/votes/route.ts`**: vote toggle `POST`
  - **`app/data/`**: constants/mappings (categories and statuses)
- **`components/`**: UI and page components (includes shadcn `ui/`)
- **`lib/`**: utilities and integrations
  - **`lib/prisma.ts`**: Prisma client using PG adapter + `DATABASE_URL`
  - **`lib/sync-user.ts`**: syncs Clerk user into the database
- **`prisma/`**: schema and migrations
  - **`prisma/schema.prisma`**: `User`, `Post`, `Vote` models + enums
  - **`prisma/migrations/`**: migration history
- **`proxy.ts`**: Clerk middleware (see note below)

**Important note**: `proxy.ts` exports `clerkMiddleware()`. In many Next.js projects, middleware lives in `middleware.ts`. This may be intentional (custom setup) or may require adjustment depending on how you deploy (**possible behavior**).

---

## ⚙️ Prerequisites

- **Node.js** (recommended: recent LTS)
- **npm** (this repo includes `package-lock.json`)
- **PostgreSQL** (local, Docker, or managed)
- **A Clerk account/project** (for authentication)

---

## 🔐 Environment variables

This project uses environment variables for the database and authentication.

### Variables referenced directly in the code

- **`DATABASE_URL`**: PostgreSQL connection string used by Prisma (`lib/prisma.ts` and `prisma.config.ts`).

### Variables expected by Clerk integration (**possible behavior**)

Clerk commonly requires environment variables in Next.js apps even if you don’t reference them via `process.env.*` in your own code.

- **`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`**: Clerk publishable key (client).
- **`CLERK_SECRET_KEY`**: Clerk secret key (server).

> If your Clerk setup uses different env names or configuration, adjust accordingly.

---

## 🔧 Installation & setup

### 1) Clone the repository

```bash
git clone <REPO_URL>
cd feedback-fusion
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure the environment

1. Create a `.env` file from the example:

```bash
cp .env.example .env
```

2. Fill in the variables in `.env`.

### 4) Database (Prisma)

With Postgres running and `DATABASE_URL` configured:

```bash
npx prisma generate
npx prisma migrate dev
```

---

## ▶️ Running the project

### Development

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production (local)

```bash
npm run build
npm run start
```

---

## 🧪 Testing

No automated tests were found in this repository (at the moment).

Suggested manual checks:

- create feedback at `/feedback/new`
- vote/unvote on `/feedback`
- verify status grouping on `/roadmap`
- (admin) edit status on `/admin`

---

## 📦 Build e deploy

- **Build**:

```bash
npm run build
```

- **Start**:

```bash
npm run start
```

### Deploy (Vercel) — recommended

As a Next.js app, deploying on Vercel is usually the simplest path.

High-level checklist:

- configure environment variables in your provider (DB + Clerk)
- ensure Postgres network access (IP allowlist/VPC, if applicable)
- run migrations (via CI/pipeline or manually)

---

## 🤝 Contributing

- Open an issue describing the bug or enhancement.
- Fork the repo and create a branch:
  - `feat/<description>` for features
  - `fix/<description>` for fixes
- Open a PR including:
  - a short summary of changes
  - a test plan (how to verify)

---

## 📄 License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE).
