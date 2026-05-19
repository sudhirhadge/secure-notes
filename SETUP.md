# Secure Notes — Setup & Deployment Guide

A full-featured notes app built with **Vite + React 18 + Tailwind CSS + React Router v6 + Zustand**.
Uses a mock backend by default — ready to swap in Supabase, Firebase, or any REST API.

---

## Project Structure

```
secure-notes/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json              ← Deploy config (Vercel)
├── .env.example             ← Copy to .env for real backends
├── .gitignore
├── package.json
└── src/
    ├── main.jsx             ← Entry point (BrowserRouter here)
    ├── App.jsx              ← Routes (lazy-loaded pages)
    ├── index.css            ← Tailwind + component classes
    ├── lib/
    │   └── api.js           ← Mock backend — swap this for real API
    ├── store/
    │   ├── authStore.js     ← Zustand auth (persisted to localStorage)
    │   └── notesStore.js    ← Zustand notes (optimistic CRUD)
    ├── hooks/
    │   ├── useNotes.js      ← Custom hook: loads notes, wraps mutations
    │   └── useForm.js       ← Generic controlled-form hook
    ├── components/
    │   ├── Nav.jsx          ← Sticky nav with auth-aware links
    │   ├── ProtectedRoute.jsx
    │   ├── NoteCard.jsx     ← Memoised card (React.memo)
    │   ├── NoteForm.jsx     ← Inline add form
    │   ├── EditModal.jsx    ← Edit modal (Escape to close)
    │   └── Snackbar.jsx     ← Rollback notification
    └── pages/
        ├── LoginPage.jsx
        ├── SignupPage.jsx
        ├── NotesPage.jsx    ← Main view (search, CRUD, optimistic updates)
        └── ProfilePage.jsx
```

---

## Quick Start (Local Dev)

### Prerequisites
- Node.js 18+ (check: `node -v`)
- npm 9+ or pnpm/yarn

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

**Demo credentials:** `demo@notes.app` / `Demo1234!`

Or sign up with any email — it's all in-memory.

---

## Key Concepts Demonstrated

### Auth — Zustand + persist middleware
`src/store/authStore.js` manages user + token state and persists them across
page refreshes via Zustand's `persist` middleware (uses `localStorage`).

```js
// Read auth state anywhere — no prop drilling, no Context boilerplate
const user  = useAuthStore(s => s.user)
const login = useAuthStore(s => s.login)
```

### Protected Routes — React Router v6
`src/components/ProtectedRoute.jsx` redirects unauthenticated users to `/login`
and remembers the attempted URL so they're sent back after login.

```jsx
<Route path="/notes" element={
  <ProtectedRoute><NotesPage /></ProtectedRoute>
} />
```

### Optimistic Updates — Zustand notes store
`src/store/notesStore.js` applies every mutation to the UI immediately,
then confirms or rolls back when the API responds.

```
ADD:    OPTIMISTIC_INSERT → api call → CONFIRM (swap tempId) | ROLLBACK (remove)
UPDATE: OPTIMISTIC_PATCH  → api call → CONFIRM (real data)   | ROLLBACK (original)
DELETE: OPTIMISTIC_REMOVE → api call → CONFIRM (done)        | ROLLBACK (re-insert)
```

### Non-blocking Search — useDeferredValue
`src/pages/NotesPage.jsx` uses `useDeferredValue` so the search input stays
instant even if filtering hundreds of notes:

```js
const deferredQuery = useDeferredValue(query)      // lags behind intentionally
const filtered      = useMemo(() => filter(notes, deferredQuery), [notes, deferredQuery])
```

The grid fades to 65% opacity while the deferred value catches up.

### Code Splitting — React.lazy + Suspense
`src/App.jsx` lazy-loads every page so users only download what they visit:

```js
const NotesPage = lazy(() => import('@/pages/NotesPage'))
```

---

## Swapping in a Real Backend

All API calls live in one file: **`src/lib/api.js`**

Each function has a clear signature — replace the body, keep the signature:

### Option A — Supabase (recommended)

```bash
npm install @supabase/supabase-js
```

```js
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

Then in `api.js`:

```js
import { supabase } from './supabase'

export async function apiLogin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return { user: data.user, token: data.session.access_token }
}

export async function apiGetNotes(userId) {
  const { data, error } = await supabase
    .from('notes').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data
}
// ...and so on for create, update, delete
```

Add to `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Supabase SQL to create the notes table:
```sql
create table notes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users not null,
  title      text,
  content    text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
-- Row-level security: users can only see their own notes
alter table notes enable row level security;
create policy "own notes" on notes
  using (auth.uid() = user_id);
```

### Option B — Firebase

```bash
npm install firebase
```

Replace `api.js` functions with `signInWithEmailAndPassword`,
`addDoc`/`updateDoc`/`deleteDoc` from `firebase/firestore`.

---

## Deploying to Vercel

### Option 1 — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
```
Follow the prompts. `vercel.json` is already configured.

### Option 2 — GitHub + Vercel dashboard
1. Push the project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Vercel auto-detects Vite — just click **Deploy**
4. Add env vars in **Project Settings → Environment Variables** if using a real backend

### Option 3 — Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

Add a `_redirects` file in `public/`:
```
/* /index.html 200
```
(Vercel handles this via `vercel.json` — Netlify needs the `_redirects` file.)

---

## Security Notes

| Topic | This demo | Production recommendation |
|---|---|---|
| Token storage | `localStorage` | `HttpOnly` cookie (immune to XSS) |
| Passwords | Stored in JS object | Hashed with bcrypt/argon2 server-side, never sent to client |
| HTTPS | localhost (dev) | Enforce via Vercel/Netlify (automatic) |
| XSS | Plain text notes only | Sanitise with DOMPurify if you add rich text |
| CSRF | N/A (no cookies) | Add CSRF tokens if you switch to cookie auth |

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint check |

---

## Next Steps

- [ ] Connect Supabase or Firebase (see above)
- [ ] Add rich text editing (Tiptap or Lexical)
- [ ] Add note tags / colour labels
- [ ] Add pagination or infinite scroll (`usePagination` hook)
- [ ] Add a settings page (theme toggle, font size)
- [ ] Write tests with Vitest + React Testing Library
- [ ] Migrate auth to HttpOnly cookies via a thin Express/Next.js API layer

# — 19 May 2026

## New Frontend Folder Structure

```txt
src/
  routes/
    AppRouter.tsx
    AppLayout.tsx

  core/
    api/
      apiClient.ts
    constants/
      routes.ts
      query.ts
    errors/
      ApiError.ts
      ErrorBoundary.tsx
    query/
      queryClient.ts
      queryKeys.ts
    utils/
      types.ts

  features/
    products/
      api/
        productsApi.ts
      hooks/
        useProducts.ts
        useProduct.ts
        useUpdateProduct.ts
      components/
        ProductsToolbar.tsx
        ProductsTable.tsx
        ProductCard.tsx
      pages/
        ProductsListPage.tsx
        ProductDetailsPage.tsx
      query/
        productsKeys.ts
      types/
        productDto.ts
        productModels.ts
      utils/
        productMappers.ts

  shared/
    components/
      Pagination.tsx
      SkeletonLoader.tsx
      LayoutContainer.tsx
    hooks/
      useDebouncedValue.ts
    utils/
      classNames.ts

  providers/
    AppProviders.tsx
    QueryProvider.tsx

main.tsx
index.css
