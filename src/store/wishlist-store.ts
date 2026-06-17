import { create } from 'zustand'
import { apiGet, apiPost, apiDelete } from '@/lib/api-client'

export interface WishlistItemType {
  id: string
  productId: string
  name: string
  image: string
  price: number
  salePrice: number
  rating: number
  inStock: boolean
}

interface WishlistState {
  items: WishlistItemType[]
  isLoading: boolean
  synced: boolean
  /** Hydrate the wishlist from the server (call after login / on app load). */
  syncFromServer: () => Promise<void>
  addItem: (item: WishlistItemType) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  toggleItem: (item: WishlistItemType) => Promise<void>
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  clearLocal: () => void
}

function mapServerItem(w: {
  id: string
  productId: string
  product: {
    id: string
    name: string
    images: string
    basePrice: number
    salePrice: number | null
    stock: number
    avgRating: number
  }
}): WishlistItemType {
  let images: string[] = []
  try { images = JSON.parse(w.product.images || '[]') } catch { images = [] }
  return {
    id: w.id,
    productId: w.productId,
    name: w.product.name,
    image: images[0] || '',
    price: w.product.basePrice,
    salePrice: w.product.salePrice ?? w.product.basePrice,
    rating: w.product.avgRating || 0,
    inStock: w.product.stock > 0,
  }
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  isLoading: false,
  synced: false,

  syncFromServer: async () => {
    try {
      set({ isLoading: true })
      const data = await apiGet<{ wishlist: Parameters<typeof mapServerItem>[0][] }>('/api/wishlist')
      const rawItems = (data.wishlist ?? []) as unknown as Parameters<typeof mapServerItem>[0][]
      set({ items: rawItems.map(mapServerItem), synced: true, isLoading: false })
    } catch {
      set({ isLoading: false, synced: true })
    }
  },

  addItem: async (item) => {
    if (get().items.some(i => i.productId === item.productId)) return
    set((state) => ({ items: [...state.items, item] }))
    try {
      await apiPost('/api/wishlist', { productId: item.productId })
      await get().syncFromServer()
    } catch (err) {
      // Revert on failure
      set((state) => ({ items: state.items.filter(i => i.productId !== item.productId) }))
      throw err
    }
  },

  removeItem: async (productId) => {
    const prev = get().items
    set((state) => ({ items: state.items.filter(i => i.productId !== productId) }))
    try {
      await apiDelete(`/api/wishlist?productId=${encodeURIComponent(productId)}`)
    } catch {
      set({ items: prev })
    }
  },

  toggleItem: async (item) => {
    if (get().isInWishlist(item.productId)) {
      await get().removeItem(item.productId)
    } else {
      await get().addItem(item)
    }
  },

  isInWishlist: (productId) => get().items.some(i => i.productId === productId),

  clearWishlist: () => set({ items: [] }),
  clearLocal: () => set({ items: [], synced: false }),
}))
