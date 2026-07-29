# InchTape Procurement — Project Plan

## 1. Analysis & Workflow Improvements

The core workflow (Supervisor creates/edits requests → Procurement updates status → notifications keep both sides in sync) is sound. A few suggestions before building:

**Status model**
- Your dropdown (None → Ordered → No Stock → Sent → Received) is good, but "No Stock" is a dead-end state with no path back. Recommend allowing re-transition from "No Stock" back to "Ordered" once restocked, rather than treating it as terminal.
- Consider a `history` table (status changes with timestamp + actor) instead of just "Updated on" — this gives you the audit trail your ⓘ icon promises ("History") almost for free, and is useful later for reports/analytics.

**Priority**
- You have priority as a field but no explicit levels defined. Recommend: `Low / Medium / High / Urgent` — 4 levels, not more, so it stays a quick pick rather than a debate.

**Reminders**
- A supervisor tapping "remind" repeatedly could spam Anusha. Recommend a simple cooldown (e.g., one reminder per request per 12 hours) enforced server-side.

**Multi-site supervisors**
- Your spec doesn't say whether one supervisor can be assigned multiple sites. Real construction supervisors often run 2–3 sites in parallel — I'll design the schema as many-to-many (supervisor ↔ site) so this isn't a blocker later, even if v1 UI only shows one site per supervisor.

**Comments → Notes (decided)**
- Simplified to a single **Notes** field per request, editable by both supervisor and procurement. No threaded chat — keeps it simple and avoids rebuilding WhatsApp inside the app. Can upgrade to a real comment thread later if the team outgrows it.

**Soft delete over hard delete**
- "Checking it archives/removes" for Received items — recommend this is a soft delete (`archivedAt` timestamp), not a real delete, so nothing is ever lost and Reports/Analytics (a listed future feature) still has the data.

---

## 1a. Branding & Login (decided)

**Login page**
- Segmented toggle: **Supervisor** (left) | **Procurement** (right) — large, thumb-friendly buttons, no dropdown.
- Small "Admin login" text link below the toggle, leading to the same form — kept low-key since it's not a daily-use role.

**Visual identity** (referenced from inchtape.com and the logo)
- Base: white / off-white background, black text — clean and airy
- Accent: yellow, used sparingly — active status pill, priority tags, primary buttons, selected nav/tab — never as a large background fill
- Rounded cards, soft shadows, generous whitespace, modern sans-serif type — same restrained tone as the marketing site, translated into app UI
- No literal reuse of the site's furniture photography — just the palette and restraint

**Mobile-first**
- Bottom tab bar for navigation (not a sidebar) — this app lives on job sites, not laptops
- Large tap targets throughout
- Camera/mic buttons prominent on Create Request
- Status change = one tap to open dropdown, one tap to select — no nested menus

---

## 2. Database Schema (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  SUPERVISOR
  PROCUREMENT
  ADMIN
}

enum RequestStatus {
  NONE
  ORDERED
  NO_STOCK
  SENT
  RECEIVED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum AttachmentType {
  IMAGE
  SKETCH
  VOICE_NOTE
}

model User {
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  passwordHash  String
  role          Role
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  sites         SiteSupervisor[]
  sitesCreated  Site[]           @relation("SiteCreatedBy")
  requests      Request[]        @relation("RequestCreatedBy")
  statusChanges StatusHistory[]  @relation("StatusChangedBy")
  fcmTokens     FcmToken[]
}

enum SiteType {
  INCHTAPE
  KG
  OTHER
}

model Site {
  id          String   @id @default(cuid())
  name        String
  code        String   @unique
  address     String?
  type        SiteType @default(INCHTAPE)
  isActive    Boolean  @default(true)     // supervisor marks false when site wraps up
  createdBy   User?    @relation("SiteCreatedBy", fields: [createdById], references: [id])
  createdById String?
  createdAt   DateTime @default(now())

  supervisors SiteSupervisor[]
  requests    Request[]
}

// Many-to-many: a supervisor can be on multiple sites
model SiteSupervisor {
  id         String @id @default(cuid())
  site       Site   @relation(fields: [siteId], references: [id])
  siteId     String
  supervisor User   @relation(fields: [supervisorId], references: [id])
  supervisorId String

  @@unique([siteId, supervisorId])
}

model Request {
  id            String        @id @default(cuid())
  materialName  String
  quantity      Int
  unit          String?       // e.g. "No.", "Bags", "Sqft"
  priority      Priority      @default(MEDIUM)
  description   String?
  notes         String?       // shared note, editable by supervisor & procurement
  status        RequestStatus @default(NONE)

  site          Site          @relation(fields: [siteId], references: [id])
  siteId        String
  createdBy     User          @relation("RequestCreatedBy", fields: [createdById], references: [id])
  createdById   String

  archivedAt    DateTime?     // soft delete once Received is checked off
  lastReminderAt DateTime?    // for reminder cooldown

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  attachments   Attachment[]
  statusHistory StatusHistory[]

  @@index([siteId])
  @@index([status])
  @@index([createdById])
}

model Attachment {
  id         String         @id @default(cuid())
  request    Request        @relation(fields: [requestId], references: [id])
  requestId  String
  type       AttachmentType
  url        String         // Supabase Storage URL
  fileName   String?
  durationSec Int?          // for voice notes
  createdAt  DateTime       @default(now())
}

model StatusHistory {
  id         String        @id @default(cuid())
  request    Request       @relation(fields: [requestId], references: [id])
  requestId  String
  fromStatus RequestStatus
  toStatus   RequestStatus
  changedBy  User          @relation("StatusChangedBy", fields: [changedById], references: [id])
  changedById String
  createdAt  DateTime      @default(now())
}

model FcmToken {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  token     String   @unique
  createdAt DateTime @default(now())
}
```

---

## 3. Folder Structure

```
inchtape-procurement/
├── apps/
│   ├── web/                        # React + Vite frontend
│   │   ├── public/
│   │   │   ├── manifest.json       # PWA manifest
│   │   │   └── icons/
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── App.tsx
│   │   │   ├── routes/              # React Router route definitions
│   │   │   ├── pages/
│   │   │   │   ├── Login/
│   │   │   │   ├── SupervisorDashboard/
│   │   │   │   ├── ProcurementDashboard/
│   │   │   │   ├── SitePage/
│   │   │   │   ├── CreateRequest/
│   │   │   │   ├── RequestDetails/
│   │   │   │   ├── Pending/ Ordered/ Sent/ Received/
│   │   │   │   ├── SitesOverview/       # Procurement/Admin: all running sites
│   │   │   │   ├── SupervisorsOverview/ # Procurement/Admin: supervisors + site counts
│   │   │   │   └── Admin/
│   │   │   ├── components/
│   │   │   │   ├── ui/              # Button, Card, Dropdown, Modal, etc.
│   │   │   │   ├── request/         # RequestCard, StatusDropdown, InfoPopover
│   │   │   │   ├── attachments/     # ImageUpload, SketchPad, VoiceRecorder
│   │   │   │   └── layout/          # Navbar, Sidebar, PageShell
│   │   │   ├── hooks/               # useAuth, useRequests, useNotifications
│   │   │   ├── lib/                 # api client, fcm setup, utils
│   │   │   ├── store/               # lightweight state (Zustand or Context)
│   │   │   ├── types/               # shared TS types (or import from packages/shared)
│   │   │   └── styles/
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── api/                         # Node.js + Express backend
│       ├── src/
│       │   ├── index.ts
│       │   ├── config/              # env, firebase, supabase clients
│       │   ├── modules/
│       │   │   ├── auth/            # controller, service, routes
│       │   │   ├── users/
│       │   │   ├── sites/
│       │   │   ├── requests/
│       │   │   ├── attachments/
│       │   │   └── notifications/
│       │   ├── middleware/          # authGuard, roleGuard, errorHandler, validate
│       │   ├── prisma/
│       │   │   ├── schema.prisma
│       │   │   └── migrations/
│       │   └── utils/
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── shared/                      # types & constants shared by web + api
│       ├── types.ts
│       └── constants.ts
│
├── .env.example
├── package.json                     # workspace root (npm/pnpm workspaces)
└── README.md
```

Each backend `module` (e.g. `requests/`) follows the same internal shape: `requests.routes.ts`, `requests.controller.ts`, `requests.service.ts`, `requests.validation.ts` — so adding future modules (Inventory, Purchase Orders, Vendors) means dropping in a new folder with the same pattern.

---

## 4. API Architecture

RESTful, versioned under `/api/v1`. JWT in `Authorization: Bearer` header. Role-based middleware guards routes.

```
Auth
POST   /api/v1/auth/login

Users (Admin only)
GET    /api/v1/users
POST   /api/v1/users
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id

Sites
GET    /api/v1/sites                      # all roles; supervisors see their own by default
POST   /api/v1/sites                      # Supervisor (self-service, auto-assigns creator) or Admin
PATCH  /api/v1/sites/:id                  # edit details
PATCH  /api/v1/sites/:id/deactivate       # supervisor marks their finished site inactive (soft, not deleted)
POST   /api/v1/sites/:id/supervisors      # Admin: assign supervisor
DELETE /api/v1/sites/:id/supervisors/:userId

Supervisors (Procurement/Admin view)
GET    /api/v1/supervisors                # list with active site count each

Requests
GET    /api/v1/requests                   # filters: site, status, priority, supervisor, search, date range
POST   /api/v1/requests                   # supervisor creates
GET    /api/v1/requests/:id
PATCH  /api/v1/requests/:id               # supervisor edits (fields) or procurement updates status
DELETE /api/v1/requests/:id               # soft delete / archive
POST   /api/v1/requests/:id/remind        # supervisor pings procurement (rate-limited)
GET    /api/v1/requests/:id/history       # status history

Attachments
POST   /api/v1/requests/:id/attachments   # returns Supabase signed upload URL, then confirms
DELETE /api/v1/attachments/:id

Dashboard / Summary
GET    /api/v1/dashboard/summary          # counts by status, high priority, per role

Notifications
POST   /api/v1/notifications/register-token   # save FCM token for logged-in user
```

**Notes:**
- Attachments use a signed-URL pattern: client asks the API for a Supabase upload URL, uploads directly to Supabase Storage (keeps large files off your Express server), then confirms the attachment record via API.
- Every mutating request-status change writes a `StatusHistory` row and triggers an FCM push in the same service-layer transaction, so notifications never get out of sync with actual state.

---

## 5. Development Roadmap & Milestones

**Milestone 0 — Foundation (setup, no features yet)**
- Monorepo scaffold, Vite + TS + Tailwind, Express + TS, Prisma connected to Supabase Postgres
- Design tokens set up (white/black/yellow palette, type scale) from the InchTape brand
- Deploy skeletons to Vercel (frontend) and Railway (backend) — confirm the pipeline works before building features

**Milestone 1 — Auth & Login UI**
- Login page: Supervisor/Procurement segmented toggle, small Admin login link
- JWT login, role-based route protection (frontend + backend)
- Bottom tab bar shell (mobile-first navigation) for each role
- Admin: add/remove users, assign supervisor↔site (supports many-to-many)

**Milestone 2 — Sites & Self-Service**
- Supervisor: "Create New Site" (name, code, address, type: Inchtape/KG/Other) — tucked into a "My Sites" menu, not on the main screen
- Supervisor: mark a site inactive once wrapped up (soft deactivate, not deleted — history stays intact)
- Procurement/Admin: **Sites** tab (all running sites) and **Supervisors** tab (list of supervisors with active-site count each)

**Milestone 3 — Core Request Flow**
- Create Request (text fields only, no attachments yet)
- Supervisor Dashboard, Site Page, request list as cards
- Edit Request
- Request Details page

**Milestone 4 — Status & Procurement Dashboard**
- Status dropdown + transitions, StatusHistory logging
- Procurement Dashboard with summary cards (Pending/Ordered/Sent/Received/High Priority)
- Pending / Ordered / Sent / Received pages
- Received → checkbox → archive

**Milestone 5 — Attachments**
- Supabase Storage integration
- Image upload, sketch upload, voice note recording/playback
- Attachment count on card, gallery in Details page

**Milestone 6 — Notifications**
- FCM setup (web push)
- New request, edited request, reminder-bell notifications
- Morning welcome card for Procurement

**Milestone 7 — Search, Filters, Views**
- Search by material/site/supervisor/status
- Filters (priority, status, site, supervisor, date)
- View by Site / View by Supervisor toggle

**Milestone 8 — Notes & Polish**
- Notes field on Request Details, editable by both roles
- PWA install prompt, offline shell, icons/manifest polish
- Mobile QA pass across all pages (this is the primary device — treat mobile bugs as blockers, not nice-to-haves)

**Milestone 9 — Hardening & Launch**
- Error handling, input validation everywhere, loading/empty states
- Deploy to production domain (procurement.inchtape.com)
- Smoke test with real users (you + Anusha + one supervisor) before full rollout

Each milestone is a working, demoable slice — nothing is a black box until the end.

---

## Next Step

Once you confirm this plan (or want changes — e.g., a different status flow, comment model, or milestone order), we start on **Milestone 0**: repo scaffold, deploys wired up, and an empty-but-running app on Vercel + Railway.
