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
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  updateProfile: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: (user) => set({ user, isAuthenticated: true }),
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      updateProfile: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      })),
    }),
    {
      name: 'auth-storage', // localStorage లో ఏ పేరుతో సేవ్ అవ్వాలో అది
      storage: createJSONStorage(() => localStorage), // ఏ స్టోరేజ్ వాడాలో క్లియర్‌గా చెప్పాలి
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)