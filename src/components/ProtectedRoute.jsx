/**
 * components/ProtectedRoute.jsx
 *
 * Redirects unauthenticated users to /login.
 * Wrap any route that requires auth with this component.
 */
import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '@/store/authStore'

export default function ProtectedRoute({ children }) {
  const user     = useAuthStore(s => s.user)
  const location = useLocation()

  if (!user) {
    // Preserve the attempted URL so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
