import { useState, useEffect } from 'react'

export default function EditModal({ note, onSave, onClose }) {
  const [title,   setTitle]   = useState(note.title)
  const [content, setContent] = useState(note.content)

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSave = () => {
    onSave(note.id, { title: title.trim(), content: content.trim() })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="card p-7 w-full max-w-lg animate-scale-in">
        <h2 className="font-display text-2xl mb-5">Edit note</h2>

        <label className="block text-[11px] font-medium text-text2 uppercase tracking-widest mb-1.5">
          Title
        </label>
        <input
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="input-base mb-4"
        />

        <label className="block text-[11px] font-medium text-text2 uppercase tracking-widest mb-1.5">
          Content
        </label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={7}
          className="input-base resize-y"
        />

        <div className="flex gap-2 justify-end mt-5">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save changes</button>
        </div>
      </div>
    </div>
  )
}
