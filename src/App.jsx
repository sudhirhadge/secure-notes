import ProtectedRoute from '@/features/auth/components/ProtectedRoute'
import Nav from '@/shared/components/Nav'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// Code-split each page — they're only downloaded when navigated to
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const SignupPage = lazy(() => import('@/features/auth/pages/SignupPage'))
const NotesPage = lazy(() => import('@/features/notes/pages/NotesPage'))
const ProfilePage = lazy(() => import('@/features/notes/pages/ProfilePage'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] text-text3 text-sm">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/notes" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}
