/**
 * store/notesStore.js
 *
 * Handles all notes state with optimistic updates + rollback.
 * Uses a flat array + immer-style manual updates (no immer dep needed).
 */
import { apiCreateNote, apiDeleteNote, apiGetNotes, apiUpdateNote } from '@/features/notes/lib/api'
import { create } from 'zustand'

const useNotesStore = create((set, get) => ({
  notes: [],
  loading: true,
  error: null,

  // ── Load ──────────────────────────────────────────────────────────────
  fetchNotes: async (userId) => {
    set({ loading: true, error: null })
    try {
      const notes = await apiGetNotes(userId)
      set({ notes, loading: false })
    } catch (e) {
      set({ loading: false, error: e.message })
    }
  },

  // ── Create (optimistic) ───────────────────────────────────────────────
  addNote: async (userId, data) => {
    const tempId = `temp-${Date.now()}`
    const optimistic = { id: tempId, userId, ...data, createdAt: Date.now(), updatedAt: Date.now(), _optimistic: true }

    set(s => ({ notes: [optimistic, ...s.notes] }))

    try {
      const saved = await apiCreateNote(userId, data)
      set(s => ({ notes: s.notes.map(n => n.id === tempId ? saved : n) }))
      return { ok: true }
    } catch (e) {
      set(s => ({ notes: s.notes.filter(n => n.id !== tempId) }))
      return { ok: false, error: e.message }
    }
  },

  // ── Update (optimistic) ───────────────────────────────────────────────
  updateNote: async (id, data) => {
    const original = get().notes.find(n => n.id === id)
    set(s => ({ notes: s.notes.map(n => n.id === id ? { ...n, ...data, _optimistic: true } : n) }))

    try {
      const saved = await apiUpdateNote(id, data)
      set(s => ({ notes: s.notes.map(n => n.id === id ? saved : n) }))
      return { ok: true }
    } catch (e) {
      set(s => ({ notes: s.notes.map(n => n.id === id ? original : n) }))
      return { ok: false, error: e.message }
    }
  },

  // ── Delete (optimistic) ───────────────────────────────────────────────
  deleteNote: async (id) => {
    const original = get().notes.find(n => n.id === id)
    set(s => ({ notes: s.notes.filter(n => n.id !== id) }))

    try {
      await apiDeleteNote(id)
      return { ok: true }
    } catch (e) {
      set(s => ({ notes: [...s.notes, original].sort((a, b) => b.createdAt - a.createdAt) }))
      return { ok: false, error: e.message }
    }
  },
}))

export default useNotesStore
