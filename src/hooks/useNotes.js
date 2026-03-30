/**
 * hooks/useNotes.js
 *
 * Wraps the Zustand notes store and adds:
 * - useEffect to fetch on mount
 * - useTransition for non-urgent state transitions
 * - Snackbar notification state
 */
import { useEffect, useState, useCallback, useTransition } from 'react'
import useNotesStore  from '@/store/notesStore'
import useAuthStore   from '@/store/authStore'

export function useNotes() {
  const user                                       = useAuthStore(s => s.user)
  const { notes, loading, fetchNotes,
          addNote, updateNote, deleteNote }         = useNotesStore()
  const [snack, setSnack]                          = useState(null)
  const [isPending, startTransition]               = useTransition()

  // Fetch once on mount (or when user changes)
  useEffect(() => {
    if (user?.id) fetchNotes(user.id)
  }, [user?.id])

  const showSnack = useCallback((msg, type = 'error') => {
    setSnack({ msg, type })
    setTimeout(() => setSnack(null), 3500)
  }, [])

  const handleAdd = useCallback(async (data) => {
    const result = await addNote(user.id, data)
    if (!result.ok) showSnack(`Couldn't save note: ${result.error}`)
    else startTransition(() => {}) // mark confirm as low-priority
  }, [user?.id, addNote])

  const handleUpdate = useCallback(async (id, data) => {
    const result = await updateNote(id, data)
    if (!result.ok) showSnack(`Update failed — rolled back: ${result.error}`)
  }, [updateNote])

  const handleDelete = useCallback(async (id) => {
    const result = await deleteNote(id)
    if (!result.ok) showSnack(`Delete failed — restored: ${result.error}`)
  }, [deleteNote])

  return { notes, loading, snack, isPending, handleAdd, handleUpdate, handleDelete }
}
