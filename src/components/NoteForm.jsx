import { useEffect, useRef, useState } from 'react'

export default function NoteForm({ onSave, onCancel }) {
  const [title,   setTitle]   = useState('')
  const [content, setContent] = useState('')
  const titleRef = useRef()

  useEffect(() => { titleRef.current?.focus() }, [])

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return
    onSave({ title: title.trim(), content: content.trim() })
  }

  const handleKey = e => {
    if (e.key === 'Escape') onCancel()
    // Ctrl/Cmd + Enter to save
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSave()
  }

  return (
    <div className="card p-6 mb-6 animate-slide-down" onKeyDown={handleKey}>
      <input
        ref={titleRef}
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Note title…"
        className="input-base mb-3 text-base font-semibold"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your note… (Ctrl+Enter to save, Esc to cancel)"
        rows={4}
        className="input-base resize-y"
      />
      <div className="flex gap-2 justify-end mt-3">
        <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary btn-sm" onClick={handleSave}>Save note</button>
      </div>
    </div>
  )
}
