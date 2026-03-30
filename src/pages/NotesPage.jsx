import { useState, useMemo, useCallback, useDeferredValue } from 'react'
import { useNotes }   from '@/hooks/useNotes'
import NoteCard        from '@/components/NoteCard'
import NoteForm        from '@/components/NoteForm'
import EditModal       from '@/components/EditModal'
import Snackbar        from '@/components/Snackbar'

export default function NotesPage() {
  const { notes, loading, snack, isPending, handleAdd, handleUpdate, handleDelete } = useNotes()

  const [showForm, setShowForm] = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [query,    setQuery]    = useState('')

  // useDeferredValue keeps the search input instant while the filtered
  // list rendering is allowed to lag behind (non-blocking UI update)
  const deferredQuery = useDeferredValue(query)

  // useMemo: recompute only when notes array or deferred query changes
  const filtered = useMemo(() => {
    const q = deferredQuery.toLowerCase().trim()
    if (!q) return notes
    return notes.filter(
      n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    )
  }, [notes, deferredQuery])

  const handleSave = useCallback(async data => {
    setShowForm(false)
    await handleAdd(data)
  }, [handleAdd])

  const handleEdit = useCallback(async (id, data) => {
    setEditing(null)
    await handleUpdate(id, data)
  }, [handleUpdate])

  const handleDeleteConfirm = useCallback(id => {
    if (window.confirm('Delete this note?')) handleDelete(id)
  }, [handleDelete])

  const isStale = deferredQuery !== query // search is catching up

  return (
    <main className="max-w-5xl mx-auto px-8 py-8">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="font-display text-3xl flex-1">My Notes</h1>

        {/* Search — useDeferredValue makes this non-blocking */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-text3 w-3.5 h-3.5" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search notes…"
            className="input-base pl-8 w-56 text-xs"
          />
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowForm(v => !v)}
        >
          {showForm ? 'Cancel' : '+ New note'}
        </button>
      </div>

      {/* Inline add form */}
      {showForm && <NoteForm onSave={handleSave} onCancel={() => setShowForm(false)} />}

      {/* Notes grid */}
      {loading ? (
        <div className="text-center py-20 text-text3">Loading notes…</div>
      ) : filtered.length === 0 ? (
        <EmptyState hasQuery={!!query} />
      ) : (
        <div
          className="grid gap-3.5 transition-opacity duration-200"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            opacity: isStale ? 0.65 : 1,
          }}
        >
          {filtered.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={setEditing}
              onDelete={handleDeleteConfirm}
            />
          ))}
        </div>
      )}

      {/* Footer meta */}
      <div className="flex items-center gap-2 mt-5">
        <span className="text-[11px] font-mono text-text3 bg-surface2 border border-border rounded px-2.5 py-1">
          {filtered.length} {filtered.length === 1 ? 'note' : 'notes'}
        </span>
        {isPending && (
          <span className="text-[11px] font-mono text-accent bg-surface2 border border-border rounded px-2.5 py-1">
            syncing…
          </span>
        )}
      </div>

      {/* Edit modal */}
      {editing && (
        <EditModal note={editing} onSave={handleEdit} onClose={() => setEditing(null)} />
      )}

      {/* Rollback snackbar */}
      {snack && <Snackbar msg={snack.msg} type={snack.type} />}
    </main>
  )
}

function EmptyState({ hasQuery }) {
  return (
    <div className="text-center py-20 text-text3">
      <FileIcon className="mx-auto mb-3 w-10 h-10 opacity-30" />
      <p className="text-sm">
        {hasQuery ? 'No notes match your search' : 'No notes yet — create your first one!'}
      </p>
    </div>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function FileIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
