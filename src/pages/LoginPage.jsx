import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import useAuthStore from '@/store/authStore'
import { useForm }  from '@/hooks/useForm'

const RULES = {
  email:    v => !v.includes('@')   && 'Enter a valid email address',
  password: v => v.length < 6       && 'Password must be at least 6 characters',
}

export default function LoginPage() {
  const login    = useAuthStore(s => s.login)
  const navigate = useNavigate()
  const location = useLocation()
  const from     = location.state?.from?.pathname ?? '/notes'

  const { values, errors, set, validate } = useForm({ email: 'demo@notes.app', password: 'Demo1234!' }, RULES)
  const [loading,    setLoading]    = useState(false)
  const [serverErr,  setServerErr]  = useState('')

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true); setServerErr('')
    try {
      await login(values.email, values.password)
      navigate(from, { replace: true })
    } catch (e) {
      setServerErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-65px)] px-6">
      <div className="card p-10 w-full max-w-sm">
        <h1 className="font-display text-4xl mb-1">Welcome back</h1>
        <p className="text-text2 text-sm mb-7">Sign in to your notes</p>

        {serverErr && (
          <div className="bg-danger/10 border border-danger rounded-lg px-4 py-3
                          text-danger text-sm mb-4">
            {serverErr}
          </div>
        )}

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={e => set('email')(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="you@example.com"
            className="input-base"
          />
        </Field>

        <Field label="Password" error={errors.password}>
          <input
            type="password"
            value={values.password}
            onChange={e => set('password')(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="••••••••"
            className="input-base"
          />
        </Field>

        <button
          className="btn btn-primary btn-full mt-1"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-center text-text2 text-sm mt-5">
          No account?{' '}
          <Link to="/signup" className="text-accent font-medium hover:underline">
            Create one
          </Link>
        </p>

        {/* Demo credentials hint */}
        <div className="mt-5 p-3 bg-surface2 rounded-lg text-[11px] font-mono text-text3 leading-relaxed">
          Demo: demo@notes.app / Demo1234!
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] font-medium text-text2 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  )
}
