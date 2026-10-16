# SCB Client Portal — Frontend Architecture

An enterprise-grade, highly scalable, and modular **React + Vite + TypeScript** frontend architecture for the **SCB Client** application.

- **Repository:** [https://github.com/Ch-saketh/SCB-client.git](https://github.com/Ch-saketh/SCB-client.git)
- **Stack:** React 19, TypeScript, Vite 8+, React Router 7, Vanilla CSS Design Tokens (zero bloat, lightning fast).
- **Architecture Paradigm:** Feature-Sliced / Domain-Driven Vertical Architecture combined with centralized design system layers.

---

## Table of Contents
1. [Architecture Philosophy](#architecture-philosophy)
2. [Project Directory Structure](#project-directory-structure)
3. [Folder Breakdown: What Goes Where & Why](#folder-breakdown-what-goes-where--why)
4. [Standard Development Processes & Workflows](#standard-development-processes--workflows)
   - [Process 1: Adding a New Feature Module](#process-1-adding-a-new-feature-module)
   - [Process 2: Adding a New Page & Route Guard](#process-2-adding-a-new-page--route-guard)
   - [Process 3: Creating a Reusable UI Component](#process-3-creating-a-reusable-ui-component)
   - [Process 4: Calling Backend APIs via Services](#process-4-calling-backend-apis-via-services)
   - [Process 5: Handling Global State & Authentication](#process-5-handling-global-state--authentication)
5. [Coding & Import Conventions](#coding--import-conventions)
6. [Getting Started & Local Development](#getting-started--local-development)
7. [Git Repository Sync](#git-repository-sync)

---

## Architecture Philosophy

This project follows the **Domain-Driven Modular (Feature-Sliced)** design pattern. Instead of grouping files purely by file type (e.g. putting all components in one massive folder and all hooks in another), the codebase isolates business logic into **feature domains** (`src/features/auth`, `src/features/dashboard`, etc.) alongside global infrastructure layers (`components/common`, `services`, `context`, `hooks`, `types`).

### Key Benefits:
- **High Cohesion, Low Coupling:** Everything needed for a domain (types, services, components, hooks) lives together.
- **Scalability:** New features can be developed or removed without breaking unrelated modules.
- **Clear Separation of Concerns:** Pure UI primitives remain stateless; feature components handle domain workflows; pages handle route binding; services manage API communications.
- **Strict Typing:** All data contracts, props, and API payloads are strictly defined with TypeScript interfaces.

---

## Project Directory Structure

```
scb-client/
├── .env.example                     # Template for environment variables
├── .gitignore                       # Git exclusion rules (node_modules, dist, etc.)
├── index.html                       # HTML entry point with metadata & viewport
├── package.json                     # NPM dependencies, scripts, and project metadata
├── tsconfig.json                    # TypeScript master configuration
├── tsconfig.app.json                # TypeScript application compiler options & aliases
├── tsconfig.node.json               # TypeScript config for Vite configuration files
├── vite.config.ts                   # Vite bundler config with '@/' alias mapping
│
├── legacy-prototypes/               # Archived original HTML mockups for design reference
│   ├── login.html                   # Original static login mockup
│   ├── signup.html                  # Original static signup mockup
│   ├── dashboard.html               # Original static dashboard mockup
│   └── success.html                 # Original static user success mockup
│
├── public/                          # Uncompiled static assets (favicon, manifest, robots)
│   └── vite.svg
│
└── src/                             # Application source code
    ├── assets/                      # Bundled static media (SVGs, brand logos, illustrations)
    │   ├── icons/                   # Custom application SVG icons
    │   └── images/                  # Graphic illustrations and brand assets
    │
    ├── components/                  # Shared, reusable, domain-agnostic UI building blocks
    │   ├── common/                  # Generic design system primitives
    │   │   ├── Badge/               # Status indicator chips (Active, Inactive, Admin)
    │   │   ├── Button/              # Action buttons (primary, outline, danger, loading)
    │   │   ├── Card/                # Elevated container card with header, body, footer
    │   │   ├── Input/               # Controlled form input with label, icons & error text
    │   │   └── Modal/               # Reusable dialog overlays
    │   ├── feedback/                # Feedback notifications & loaders
    │   │   ├── Alert/               # Warning, error, success, and info alert banners
    │   │   ├── EmptyState/          # Zero-data placeholder views
    │   │   └── Loader/              # Animated spinner and skeleton loaders
    │   └── layout/                  # Structural page layout components
    │       ├── Footer/              # Application footer
    │       ├── Header/              # Top navigation bar with branding & session state
    │       └── Sidebar/             # Collapsible admin navigation menu
    │
    ├── config/                      # Centralized runtime configuration & environment
    │   ├── constants.ts             # App-wide constants, storage keys, role definitions
    │   └── env.ts                   # Type-safe wrapper for import.meta.env variables
    │
    ├── context/                     # Global state management (React Context API)
    │   ├── AuthContext.tsx          # Authentication state, login/logout, role session
    │   └── ThemeContext.tsx         # Theme provider (light/dark mode toggle)
    │
    ├── features/                    # Domain-driven feature modules (Vertical slices)
    │   ├── auth/                    # Authentication domain
    │   │   ├── components/          # LoginForm.tsx, SignupForm.tsx
    │   │   ├── hooks/               # useLoginForm.ts, useSessionTimer.ts
    │   │   ├── services/            # authService.ts (login, register, token refresh)
    │   │   └── types/               # auth.types.ts (Credentials, SessionPayload)
    │   │
    │   ├── dashboard/               # Dashboard analytics & operations
    │   │   ├── components/          # MetricCard.tsx, UsersTable.tsx, StatsChart.tsx
    │   │   ├── hooks/               # useDashboardData.ts
    │   │   ├── services/            # dashboardService.ts (fetch stats, aggregate logs)
    │   │   └── types/               # dashboard.types.ts (DashboardMetrics, ManagedUser)
    │   │
    │   └── users/                   # User profile & account management
    │       ├── components/          # UserDetailCard.tsx, EditRoleModal.tsx
    │       ├── services/            # userService.ts
    │       └── types/               # user.types.ts
    │
    ├── hooks/                       # Shared utility React hooks (Cross-cutting)
    │   ├── useDebounce.ts           # Debounce hook for search queries & inputs
    │   ├── useLocalStorage.ts       # Reactive state persistence in localStorage
    │   └── useMediaQuery.ts         # Media query breakpoint detection for responsive UI
    │
    ├── layouts/                     # High-level page layout templates
    │   ├── AuthLayout.tsx           # Centered card layout for login & registration
    │   ├── DashboardLayout.tsx      # Sidebar + Top Header + Main Content container
    │   └── MainLayout.tsx           # Standard public view container
    │
    ├── pages/                       # Route-level page components (views mapped to URLs)
    │   ├── auth/
    │   │   ├── LoginPage.tsx        # /login page
    │   │   └── SignupPage.tsx       # /signup page
    │   ├── dashboard/
    │   │   └── DashboardPage.tsx    # /dashboard page (Admin analytics & user table)
    │   ├── success/
    │   │   └── SuccessPage.tsx      # /success page (User onboarding/welcome view)
    │   └── not-found/
    │       └── NotFoundPage.tsx     # 404 fallback page
    │
    ├── routes/                      # Routing infrastructure & navigation guards
    │   ├── AppRoutes.tsx            # Master router tree with public & protected branches
    │   ├── paths.ts                 # Strongly-typed URL route constants
    │   └── ProtectedRoute.tsx       # Route guard checking authentication and role access
    │
    ├── services/                    # Core API layer & network transport
    │   ├── apiClient.ts             # Central HTTP client (fetch/Axios abstraction)
    │   └── endpoints.ts             # Registry of backend API URLs
    │
    ├── styles/                      # Design system tokens and foundational CSS
    │   ├── index.css                # Master CSS entry point & utilities
    │   ├── reset.css                # Modern CSS box-sizing & element reset
    │   └── variables.css            # CSS custom properties (colors, typography, spacing)
    │
    ├── types/                       # Universal TypeScript models & contracts
    │   ├── api.types.ts             # ApiResponse, ApiError, Pagination interfaces
    │   ├── common.types.ts          # ID, StatusType, UserRole ('user' | 'admin')
    │   ├── index.ts                 # Central barrel export
    │   └── user.types.ts            # User and AuthSession data contracts
    │
    ├── utils/                       # Pure utility functions (no React dependencies)
    │   ├── formatters.ts            # Currency, date, and text formatters
    │   ├── storage.ts               # Safe JSON localStorage wrapper with try/catch
    │   └── validators.ts            # Email regex, password length, and form validators
    │
    ├── App.tsx                      # Root App component (wraps Router, Context Providers)
    ├── main.tsx                     # React 19 DOM bootstrap entry point
    └── vite-env.d.ts                # TypeScript declarations for Vite client
```

---

## Folder Breakdown: What Goes Where & Why

| Folder | What We Keep Here | Why It Exists (The Process) |
| :--- | :--- | :--- |
| `src/assets/` | SVGs, brand logos, png images, custom fonts. | Kept inside `src/` so the Vite bundler can optimize, hash, and compress them for production caching. |
| `src/components/common/` | Atomic UI primitives: `Button`, `Input`, `Card`, `Badge`, `Modal`. | Must **NEVER** contain business logic. They accept props and emit events, enabling 100% reusability across any page or feature. |
| `src/components/feedback/` | User feedback elements: `Alert`, `Loader`, `EmptyState`. | Standardizes how errors, progress indicators, and empty lists are communicated to the user. |
| `src/components/layout/` | Structural shells: `Header`, `Sidebar`, `Footer`. | Holds persistent navigation bars and menus that wrap pages. |
| `src/config/` | `env.ts`, `constants.ts`. | Prevents hardcoded strings and magic numbers. Centralizes environment variables with fallback defaults. |
| `src/context/` | React Context providers: `AuthContext`, `ThemeContext`. | Manages app-wide state that many components need (current logged-in user, JWT token, user role, active theme). |
| `src/features/<name>/` | Vertical slices: `auth`, `dashboard`, `users`. | Every business capability gets its own self-contained folder containing its own components, services, and types. |
| `src/hooks/` | Custom cross-cutting React hooks: `useDebounce`, `useLocalStorage`. | Reusable stateful logic shared across multiple unrelated components. |
| `src/layouts/` | Shell templates: `AuthLayout`, `DashboardLayout`, `MainLayout`. | Defines page structure (e.g. centering forms on auth pages, providing a sidebar grid for the admin dashboard). |
| `src/pages/` | Top-level page views: `LoginPage`, `DashboardPage`. | 1-to-1 mapping with URLs. Pages assemble feature components and layouts; they should remain lightweight. |
| `src/routes/` | Route definitions: `AppRoutes.tsx`, `paths.ts`, `ProtectedRoute.tsx`. | Handles client-side URL switching, redirection, and enforces role access (e.g. restricting `/dashboard` to `admin`). |
| `src/services/` | `apiClient.ts`, `endpoints.ts`. | Centralizes network transport, token attachment (`Authorization: Bearer <token>`), and global error handling. |
| `src/styles/` | `variables.css`, `reset.css`, `index.css`. | Defines design system tokens (colors, radii, shadows, typography) using clean CSS variables for fast styling without bulky libraries. |
| `src/types/` | Shared TypeScript contracts: `common.types.ts`, `api.types.ts`. | Single source of truth for interfaces and models to guarantee compile-time type safety. |
| `src/utils/` | Pure helper functions: `validators.ts`, `formatters.ts`, `storage.ts`. | Deterministic utility functions that can be tested in isolation with zero React dependencies. |
| `legacy-prototypes/` | Archived original HTML files (`login.html`, `dashboard.html`, etc.). | Preserved for reference so you can always cross-check legacy behavior against the new React application. |

---

## Standard Development Processes & Workflows

### Process 1: Adding a New Feature Module
When introducing a new domain capability (e.g., `reports`, `notifications`, `billing`):
1. Create a new folder under `src/features/<feature-name>/`:
   ```bash
   mkdir -p src/features/reports/{components,hooks,services,types}
   ```
2. **Define Data Contracts:** Create `types/reports.types.ts` defining data models and API response types.
3. **Build API Service:** Create `services/reportsService.ts` to call backend endpoints using `apiClient`.
4. **Create Feature Components:** Build UI components inside `components/` (e.g., `ReportSummaryTable.tsx`) using shared primitives from `@/components/common/`.
5. **Create Feature Hook (Optional):** If state or data fetching is complex, create `hooks/useReports.ts`.

---

### Process 2: Adding a New Page & Route Guard
To add a new route (e.g. `/reports` accessible only by admins):
1. **Define the Path Constant:** Add the path to `src/routes/paths.ts`:
   ```ts
   export const ROUTE_PATHS = {
     // ...
     REPORTS: '/reports',
   };
   ```
2. **Create the Page View:** Create `src/pages/reports/ReportsPage.tsx`:
   ```tsx
   import React from 'react';
   export const ReportsPage: React.FC = () => {
     return <div>Reports Content</div>;
   };
   ```
3. **Register in `src/routes/AppRoutes.tsx`:**
   ```tsx
   <Route
     path={ROUTE_PATHS.REPORTS}
     element={
       <ProtectedRoute requiredRole="admin">
         <DashboardLayout />
       </ProtectedRoute>
     }
   >
     <Route index element={<ReportsPage />} />
   </Route>
   ```

---

### Process 3: Creating a Reusable UI Component
To add a new design primitive (e.g., `Modal` or `Dropdown`):
1. Create folder `src/components/common/<ComponentName>/`:
   - `<ComponentName>.tsx` (Component logic and strict prop interface)
   - `<ComponentName>.css` (Component-scoped styles utilizing CSS tokens from `var(--color-...)`)
2. Keep it presentational and decoupled:
   - Accept `className` and `style` to allow flexible overrides.
   - Use standard HTML attributes via `extends ButtonHTMLAttributes`, `InputHTMLAttributes`, etc.

---

### Process 4: Calling Backend APIs via Services
All HTTP requests flow through the centralized `apiClient`:
```ts
// src/services/endpoints.ts
export const API_ENDPOINTS = {
  REPORTS: {
    LIST: '/reports',
    DOWNLOAD: (id: string) => `/reports/${id}/download`,
  },
};

// src/features/reports/services/reportsService.ts
import { apiClient } from '@/services/apiClient';
import { API_ENDPOINTS } from '@/services/endpoints';
import { ReportItem } from '../types/reports.types';

export const reportsService = {
  async getReports(): Promise<ReportItem[]> {
    const res = await apiClient.get<ReportItem[]>(API_ENDPOINTS.REPORTS.LIST);
    return res.data;
  },
};
```
- `apiClient` automatically injects the Bearer auth token from `localStorage`.
- Thrown errors match the `ApiError` interface for predictable handling in UI components.

---

### Process 5: Handling Global State & Authentication
Authentication and session information are managed through `AuthContext`:
- **Read State:** Use `useAuth()` in any component:
  ```tsx
  const { user, role, isAuthenticated, logout } = useAuth();
  ```
- **Login Action:**
  ```tsx
  login(userData, jwtToken); // Updates state & syncs to localStorage
  ```
- **Role Redirection Rule:**
  - `role === 'admin'` or `username === 'admin'` redirects to the **Admin Dashboard** (`/dashboard`).
  - Regular `role === 'user'` redirects to the **Success / Landing View** (`/success`).

---

## Coding & Import Conventions

### Path Aliases (`@/*`)
The project is configured with `@/*` mapping directly to `src/*`. Avoid deep relative paths like `../../components/common/Button`:
- **Correct:** `import { Button } from '@/components/common/Button/Button';`
- **Correct:** `import { useAuth } from '@/context/AuthContext';`
- **Avoid:** `import { Button } from '../../../components/common/Button/Button';`

### Naming Conventions
- **Components & Layouts:** `PascalCase.tsx` (e.g., `LoginForm.tsx`, `DashboardLayout.tsx`)
- **Hooks:** `camelCase.ts` prefixed with `use` (e.g., `useLocalStorage.ts`, `useDebounce.ts`)
- **Services & Utils:** `camelCase.ts` (e.g., `authService.ts`, `formatters.ts`)
- **Types & Interfaces:** `PascalCase` with `.types.ts` suffix (e.g., `user.types.ts`, `auth.types.ts`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `APP_CONFIG`, `STORAGE_KEYS`)

---

## Getting Started & Local Development

### Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **NPM:** v9.0.0 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/Ch-saketh/SCB-client.git
cd SCB-client

# Install dependencies
npm install
```

### Environment Setup
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

### Available NPM Scripts
| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR). |
| `npm run build` | Runs TypeScript compiler typecheck (`tsc -b`) and generates production build in `dist/`. |
| `npm run preview` | Locally serves the production build from `dist/` for sanity testing. |
| `npm run lint` | Runs oxlint / linter to inspect code quality. |

---

## Git Repository Sync

This project is linked to the GitHub remote repository:
`https://github.com/Ch-saketh/SCB-client.git`

To stage, commit, and push your initial structure:
```bash
# Check git status
git status

# Stage all files
git add .

# Create the initial commit
git commit -m "feat: establish scalable enterprise Vite + React + TypeScript frontend architecture"

# Push to main branch
git push -u origin main
```
