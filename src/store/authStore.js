/**
 * store/authStore.js
 *
 * Zustand replaces React Context for auth state.
 * Persists user + token to localStorage via the `persist` middleware.
 *
 * Security note: localStorage is vulnerable to XSS.
 * In production, store the JWT in an HttpOnly cookie and keep
 * only non-sensitive user metadata (name, email) in JS-land.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiLogin, apiSignup } from '@/lib/api'

const useAuthStore = create(
  persist(
    (set) => ({
      user:  null,
      token: null,

      login: async (email, password) => {
        const { user, token } = await apiLogin(email, password)
        set({ user, token })
        return user
      },

      signup: async (name, email, password) => {
        const { user, token } = await apiSignup(name, email, password)
        set({ user, token })
        return user
      },

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'sn_session', // localStorage key
      // Only persist the user object — not the full store
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)

export default useAuthStore
