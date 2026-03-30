import { memo } from 'react'

const NoteCard = memo(function NoteCard({ note, onEdit, onDelete }) {
  const fmt = ts =>
    new Date(ts).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div
      onClick={() => onEdit(note)}
      className={`note-card relative card p-5 cursor-pointer transition-all duration-200
                  hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                  ${note._optimistic ? 'opacity-60' : ''}`}
    >
      {/* Optimistic indicator */}
      {note._optimistic && (
        <span className="absolute top-3 right-3 text-[10px] font-mono text-accent">
          saving…
        </span>
      )}

      <h3 className="font-semibold text-sm text-text1 mb-1.5 leading-snug line-clamp-2">
        {note.title || <span className="text-text3 italic">Untitled</span>}
      </h3>

      <p className="text-xs text-text2 leading-relaxed line-clamp-4 whitespace-pre-line">
        {note.content}
      </p>

      <div className="flex items-center justify-between mt-4">
        <span className="text-[11px] font-mono text-text3">{fmt(note.updatedAt)}</span>

        {/* Action buttons — revealed on hover via CSS */}
        <div
          className="note-actions flex gap-1"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="btn btn-ghost btn-sm !px-2 !py-1 text-xs"
            onClick={() => onEdit(note)}
            title="Edit"
          >
            ✎
          </button>
          <button
            className="btn btn-danger btn-sm !px-2 !py-1 text-xs"
            onClick={() => onDelete(note.id)}
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
})

export default NoteCard
