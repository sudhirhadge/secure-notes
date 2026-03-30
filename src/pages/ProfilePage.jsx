import { useNavigate } from 'react-router-dom'
import useAuthStore   from '@/store/authStore'
import useNotesStore  from '@/store/notesStore'

export default function ProfilePage() {
  const user     = useAuthStore(s => s.user)
  const logout   = useAuthStore(s => s.logout)
  const notes    = useNotesStore(s => s.notes)
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <main className="max-w-5xl mx-auto px-8 py-8">
      <h1 className="font-display text-3xl mb-6">Profile</h1>

      <div className="card p-7 max-w-md">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-accent text-bg font-display
                        text-2xl flex items-center justify-center mb-4">
          {user.name?.[0]?.toUpperCase()}
        </div>

        <div className="font-display text-2xl mb-1">{user.name}</div>
        <div className="font-mono text-sm text-text2 mb-5">{user.email}</div>

        {/* Stats */}
        <div className="flex gap-3 mb-6">
          <Stat label="Notes" value={notes.length} />
          <div className="flex items-center gap-1.5 bg-success/10 border border-success/30
                          rounded-md px-3 py-1.5 text-xs font-mono text-success">
            🔒 Session active
          </div>
        </div>

        {/* Security callout */}
        <div className="bg-surface2 border border-border rounded-xl p-4 mb-6
                        text-xs text-text2 leading-relaxed">
          <p className="font-semibold text-text1 mb-1.5">🛡 Security notice</p>
          <p>
            This demo stores your session token in{' '}
            <code className="font-mono bg-surface3 px-1 rounded">localStorage</code>.
            In production, use{' '}
            <strong className="text-text1">HttpOnly cookies</strong> to prevent
            XSS-based token theft. Passwords are never logged or sent to the client.
          </p>
        </div>

        <button className="btn btn-danger" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </main>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-surface2 border border-border rounded-md px-3 py-1.5
                    text-xs font-mono text-text2 flex items-center gap-1.5">
      <span className="text-text1 font-semibold">{value}</span> {label}
    </div>
  )
}
