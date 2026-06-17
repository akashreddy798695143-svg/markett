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
<<<<<<< HEAD
  | 'about'
  | 'contact'
  | 'careers'
  | 'blog'
  | 'press'
  | 'help'
  | 'returns'
  | 'shipping'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'refund-policy'
  | 'sitemap'
  | 'cookies'
=======
  | 'about' | 'contact' | 'careers' | 'blog' | 'press' | 'help'
  | 'returns' | 'shipping' | 'faq' | 'privacy' | 'terms' | 'refund-policy'
  | 'sitemap' | 'cookies'
>>>>>>> 727986fe0e8dccab0979cf37066d6e3ac22d8297

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
<<<<<<< HEAD
=======
  
  // ఫంక్షన్స్
>>>>>>> 727986fe0e8dccab0979cf37066d6e3ac22d8297
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
<<<<<<< HEAD
  navigate: (view, options) => set({
    currentView: view,
    selectedProductId: options?.productId ?? null,
    selectedCategory: options?.category ?? null,
    searchQuery: options?.query ?? '',
    dashboardTab: options?.tab ?? 'profile',
    sellerTab: options?.tab ?? 'dashboard',
    adminTab: options?.tab ?? 'dashboard',
  }),
  navigateToInfo: (page) => set({ currentView: 'info', infoPage: page }),
=======

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
  
>>>>>>> 727986fe0e8dccab0979cf37066d6e3ac22d8297
  setSearchQuery: (query) => set({ searchQuery: query }),
  setAuthMode: (mode) => set({ authMode: mode }),
  setDashboardTab: (tab) => set({ dashboardTab: tab }),
  setSellerTab: (tab) => set({ sellerTab: tab }),
  setAdminTab: (tab) => set({ adminTab: tab }),
}))
