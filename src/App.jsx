import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from '@/components/Nav'
import ProtectedRoute from '@/components/ProtectedRoute'
import TestTsx from './TestTsx'

// Code-split each page — they're only downloaded when navigated to
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const SignupPage = lazy(() => import('@/pages/SignupPage'))
const NotesPage = lazy(() => import('@/pages/NotesPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))

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
      <TestTsx title='TypeScriptCount' />
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
