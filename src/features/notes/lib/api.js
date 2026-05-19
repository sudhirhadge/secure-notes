/**
 * lib/api.js — Mock backend
 *
 * Simulates network latency and occasional server errors (~10%)
 * so optimistic-update rollback logic gets exercised.
 *
 * SWAP THIS OUT: Replace each function body with a real
 * fetch/axios call to Supabase, Firebase, or your own API.
 * The call signatures stay the same so nothing else changes.
 */

const db = {
  users: [
    {
      id: 'u1',
      email: 'demo@notes.app',
      // ⚠ Never store plain-text passwords in production.
      // Use bcrypt/argon2 server-side. This is mock-only.
      password: 'Demo1234!',
      name: 'Alex Mercer',
    },
  ],
  notes: [
    {
      id: 'n1',
      userId: 'u1',
      title: 'Welcome to Secure Notes',
      content:
        'This app demonstrates React concepts:\n\n• Auth with Zustand\n• Protected routes via React Router\n• Optimistic updates with rollback\n• useDeferredValue for search\n• useTransition for saves\n\nFeel free to add, edit, or delete notes!',
      createdAt: Date.now() - 86_400_000,
      updatedAt: Date.now() - 86_400_000,
    },
    {
      id: 'n2',
      userId: 'u1',
      title: 'React Performance Patterns',
      content:
        '• useMemo — memoize expensive derived values\n• useCallback — stable function refs across renders\n• React.memo — skip child re-renders\n• useDeferredValue — non-blocking search/filter\n• useTransition — deprioritise non-urgent state updates',
      createdAt: Date.now() - 3_600_000,
      updatedAt: Date.now() - 3_600_000,
    },
    {
      id: 'n3',
      userId: 'u1',
      title: 'Security Notes',
      content:
        'JWT tokens should live in HttpOnly cookies — not localStorage — to prevent XSS theft.\n\nAlways sanitise user HTML before rendering.\nNever log passwords or tokens.',
      createdAt: Date.now() - 7_200_000,
      updatedAt: Date.now() - 7_200_000,
    },
  ],
}

const delay  = (ms = 500)  => new Promise(r => setTimeout(r, ms))
const mayFail = (rate = 0.1) => Math.random() < rate

// ─── Auth ────────────────────────────────────────────────────────────────

export async function apiLogin(email, password) {
  await delay(700)
  const user = db.users.find(u => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid email or password')
  const { password: _, ...safeUser } = user
  return { user: safeUser, token: `mock-jwt-${user.id}-${Date.now()}` }
}

export async function apiSignup(name, email, password) {
  await delay(700)
  if (db.users.find(u => u.email === email))
    throw new Error('Email already registered')
  const user = { id: `u${Date.now()}`, email, password, name }
  db.users.push(user)
  // Seed a starter note for new users
  db.notes.push({
    id: `n${Date.now()}`,
    userId: user.id,
    title: 'My first note',
    content: 'Welcome! Start writing your thoughts here.',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
  const { password: _, ...safeUser } = user
  return { user: safeUser, token: `mock-jwt-${user.id}-${Date.now()}` }
}

// ─── Notes ───────────────────────────────────────────────────────────────

export async function apiGetNotes(userId) {
  await delay(400)
  return db.notes
    .filter(n => n.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt)
}

export async function apiCreateNote(userId, data) {
  await delay(600)
  if (mayFail()) throw new Error('Server error — please retry')
  const note = { id: `n${Date.now()}`, userId, ...data, createdAt: Date.now(), updatedAt: Date.now() }
  db.notes.push(note)
  return note
}

export async function apiUpdateNote(id, data) {
  await delay(500)
  if (mayFail()) throw new Error('Server error — please retry')
  const i = db.notes.findIndex(n => n.id === id)
  if (i === -1) throw new Error('Note not found')
  db.notes[i] = { ...db.notes[i], ...data, updatedAt: Date.now() }
  return db.notes[i]
}

export async function apiDeleteNote(id) {
  await delay(400)
  if (mayFail()) throw new Error('Server error — please retry')
  db.notes = db.notes.filter(n => n.id !== id)
}
