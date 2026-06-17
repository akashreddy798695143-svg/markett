import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: 'customer' | 'seller' | 'admin'
  walletBalance: number
  rewardPoints: number
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token?: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  updateProfile: (data: Partial<User>) => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
<<<<<<< HEAD
      login: (user, token) => set({ user, isAuthenticated: true, token: token || null }),
      logout: () => set({ user: null, isAuthenticated: false, token: null }),
=======
      
      login: (user) => set({ user, isAuthenticated: true }),
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
>>>>>>> 727986fe0e8dccab0979cf37066d6e3ac22d8297
      setLoading: (isLoading) => set({ isLoading }),
      
      updateProfile: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      })),
      setToken: (token) => set({ token }),
    }),
    {
<<<<<<< HEAD
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated, token: state.token }),
=======
      name: 'auth-storage', // localStorage లో ఏ పేరుతో సేవ్ అవ్వాలో అది
      storage: createJSONStorage(() => localStorage), // ఏ స్టోరేజ్ వాడాలో క్లియర్‌గా చెప్పాలి
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
>>>>>>> 727986fe0e8dccab0979cf37066d6e3ac22d8297
    }
  )
)