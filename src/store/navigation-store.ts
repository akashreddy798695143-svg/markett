import { create } from 'zustand'

export type ViewMode =
  | 'home'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'auth'
  | 'user-dashboard'
  | 'seller-panel'
  | 'admin-panel'
  | 'info'

export type InfoPage =
  | 'about' | 'contact' | 'careers' | 'blog' | 'press' | 'help'
  | 'returns' | 'shipping' | 'faq' | 'privacy' | 'terms' | 'refund-policy'
  | 'sitemap' | 'cookies'

interface NavigationState {
  currentView: ViewMode
  selectedProductId: string | null
  selectedCategory: string | null
  searchQuery: string
  dashboardTab: string
  sellerTab: string
  adminTab: string
  authMode: 'login' | 'register' | 'otp' | 'forgot-password'
  infoPage: InfoPage
  
  // ఫంక్షన్స్
  navigate: (view: ViewMode, options?: { productId?: string; category?: string; query?: string; tab?: string }) => void
  navigateToInfo: (page: InfoPage) => void
  setSearchQuery: (query: string) => void
  setAuthMode: (mode: 'login' | 'register' | 'otp' | 'forgot-password') => void
  setDashboardTab: (tab: string) => void
  setSellerTab: (tab: string) => void
  setAdminTab: (tab: string) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentView: 'home',
  selectedProductId: null,
  selectedCategory: null,
  searchQuery: '',
  dashboardTab: 'profile',
  sellerTab: 'dashboard',
  adminTab: 'dashboard',
  authMode: 'login',
  infoPage: 'about',

  navigate: (view, options = {}) => set((state) => ({
    currentView: view,
    selectedProductId: options.productId ?? state.selectedProductId,
    selectedCategory: options.category ?? state.selectedCategory,
    searchQuery: options.query ?? state.searchQuery,
    // Tab logic ni dynamic ga handle chesam
    dashboardTab: view === 'user-dashboard' ? (options.tab ?? state.dashboardTab) : state.dashboardTab,
    sellerTab: view === 'seller-panel' ? (options.tab ?? state.sellerTab) : state.sellerTab,
    adminTab: view === 'admin-panel' ? (options.tab ?? state.adminTab) : state.adminTab,
  })),

  navigateToInfo: (page) => set({ currentView: 'info', infoPage: page }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setAuthMode: (mode) => set({ authMode: mode }),
  setDashboardTab: (tab) => set({ dashboardTab: tab }),
  setSellerTab: (tab) => set({ sellerTab: tab }),
  setAdminTab: (tab) => set({ adminTab: tab }),
}))
