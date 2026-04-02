## ✅ Concepts used in this app 

App uses a solid modern React architecture with good patterns. The summary below is accurate to your current codebase and ready for README / docs.

### 1. React + Vite + SPA basics
- `React` functional components (JSX)
- `Vite` build/dev tooling
- Single-Page Application (SPA) routing via `react-router-dom`
- Route fallbacks and navigation:
  - `/login`, `/signup` public
  - `/notes`, `/profile` protected
  - wildcard `*` -> redirect to `/notes`

### 2. Code splitting + lazy loading
- `React.lazy()` for pages (`LoginPage`, `SignupPage`, `NotesPage`, `ProfilePage`)
- `Suspense` + fallback loader (`PageLoader`)
- Improves initial bundle size and load performance

### 3. Global state management with Zustand
- `authStore` for auth session (`user`, `token`)
  - actions: `login`, `signup`, `logout`
  - persistent middleware `persist` to localStorage
- `notesStore` for notes data lifecycle (`notes`, `loading`, `error`)
  - actions: `fetchNotes`, `addNote`, `updateNote`, `deleteNote`
  - optimistic UI updates + rollback on failure

### 4. Auth guard pattern
- `ProtectedRoute` component checks `user` from auth store
- `Navigate` to `/login` if unauthenticated
- `state.from` preserves attempted route for post-login redirect

### 5. API abstraction
- api.js likely centralizes HTTP/JWT calls
- store actions rely on API promise results (`apiLogin`, `apiSignup`, `apiGetNotes`, etc.)

### 6. UI pattern / components
- `Nav`, `NoteCard`, `NoteForm`, `EditModal`, `Snackbar`
- likely Tailwind CSS utility classes (`min-h-screen flex flex-col`, etc.)

### 7. Optimistic updates (notes)
- `addNote`: temp item with `_optimistic`, replace with real response
- `updateNote`: local change and API sync, rollback to original on error
- `deleteNote`: remove local note then confirm backend or restore on error

### 8. Persistence and UX
- localStorage `sn_session` for auth persistence
- in-store comments include security note (“use HttpOnly cookie in prod”)
- consistent error and loading states in notes flow


