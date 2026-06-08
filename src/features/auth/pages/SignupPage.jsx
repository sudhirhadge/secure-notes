import { useForm } from '@/features/notes/hooks/useForm'
import useAuthStore from '@/store/authStore'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RULES = {
  name: v => !v.trim() && 'Name is required',
  email: v => !v.includes('@') && 'Enter a valid email address',
  password: v => v.length < 8 && 'Password must be at least 8 characters',
}

export default function SignupPage() {
  const signup = useAuthStore(s => s.signup)
  const navigate = useNavigate()

  const { values, errors, set, validate } = useForm({ name: '', email: '', password: '' }, RULES)
  const [loading, setLoading] = useState(false)
  const [serverErr, setServerErr] = useState('')

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true); setServerErr('')
    try {
      await signup(values.name, values.email, values.password)
      navigate('/notes', { replace: true })
    } catch (e) {
      setServerErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-65px)] px-6">
      <div className="card p-10 w-full max-w-sm">
        <h1 className="font-display text-4xl mb-1">Create account</h1>
        <p className="text-text2 text-sm mb-7">Start capturing your thoughts securely</p>

        {serverErr && (
          <div className="bg-danger/10 border border-danger rounded-lg px-4 py-3
                          text-danger text-sm mb-4">
            {serverErr}
          </div>
        )}

        {[
          { key: 'name', label: 'Full name', type: 'text', placeholder: 'Alex Mercer' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
          { key: 'password', label: 'Password', type: 'password', placeholder: 'min 8 characters' },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key} className="mb-4">
            <label className="block text-[11px] font-medium text-text2 uppercase tracking-widest mb-1.5">
              {label}
            </label>
            <input
              type={type}
              value={values[key]}
              onChange={e => set(key)(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder={placeholder}
              className="input-base"
            />
            {errors[key] && <p className="text-danger text-xs mt-1">{errors[key]}</p>}
          </div>
        ))}

        <button
          className="btn btn-primary btn-full mt-1"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>

        <p className="text-center text-text2 text-sm mt-5">
          Already have one?{' '}
          <Link to="/login" className="text-accent font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
