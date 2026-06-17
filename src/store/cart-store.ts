import { create } from 'zustand'
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api-client'

export interface CartItemType {
  id: string
  productId: string
  name: string
  image: string
  price: number
  salePrice: number
  quantity: number
  color?: string
  size?: string
  variantId?: string
  stock: number
  saveForLater: boolean
}

interface CartState {
  items: CartItemType[]
  couponCode: string
  couponDiscount: number
  isLoading: boolean
  synced: boolean
  /** Hydrate the cart from the server (call after login / on app load). */
  syncFromServer: () => Promise<void>
  addItem: (item: CartItemType) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  toggleSaveForLater: (id: string) => void
  applyCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
  clearCart: () => void
  clearLocal: () => void
  getSubtotal: () => number
  getDiscount: () => number
  getTotal: () => number
  getItemCount: () => number
}

/** Map a server cart item (with nested product) to the local CartItemType. */
function mapServerItem(ci: {
  id: string
  productId: string
  variantId?: string | null
  quantity: number
  saveForLater?: boolean
  product: {
    id: string
    name: string
    images: string
    basePrice: number
    salePrice: number | null
    stock: number
  }
}): CartItemType {
  let images: string[] = []
  try { images = JSON.parse(ci.product.images || '[]') } catch { images = [] }
  return {
    id: ci.id,
    productId: ci.productId,
    name: ci.product.name,
    image: images[0] || '',
    price: ci.product.basePrice,
    salePrice: ci.product.salePrice ?? ci.product.basePrice,
    quantity: ci.quantity,
    variantId: ci.variantId || undefined,
    stock: ci.product.stock,
    saveForLater: ci.saveForLater ?? false,
  }
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  couponCode: '',
  couponDiscount: 0,
  isLoading: false,
  synced: false,

  syncFromServer: async () => {
    try {
      set({ isLoading: true })
      const data = await apiGet<{ cart?: { items: ReturnType<typeof mapServerItem>[] }; totalItems?: number } & { items?: ReturnType<typeof mapServerItem>[] }>('/api/cart')
      // The API returns { cart: { items: [...] } } — normalise both shapes
      const rawItems = (data.cart?.items ?? data.items ?? []) as unknown as Parameters<typeof mapServerItem>[0][]
      set({ items: rawItems.map(mapServerItem), synced: true, isLoading: false })
    } catch {
      set({ isLoading: false, synced: true })
    }
  },

  addItem: async (item) => {
    // Optimistic insert (dedupe by productId + variantId)
    const existing = get().items.find(i => i.productId === item.productId && i.variantId === item.variantId)
    if (existing) {
      set((state) => ({
        items: state.items.map(i =>
          i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      }))
    } else {
      set((state) => ({ items: [...state.items, item] }))
    }
    try {
      const data = await apiPost<{ cart: { items: Parameters<typeof mapServerItem>[0][] } }>('/api/cart', {
        productId: item.productId,
        variantId: item.variantId || null,
        quantity: item.quantity,
      })
      const rawItems = (data.cart?.items ?? []) as unknown as Parameters<typeof mapServerItem>[0][]
      set({ items: rawItems.map(mapServerItem), synced: true })
    } catch (err) {
      // Revert on failure (e.g. 401) by re-syncing
      await get().syncFromServer()
      throw err
    }
  },

  removeItem: async (id) => {
    const prev = get().items
    set((state) => ({ items: state.items.filter(i => i.id !== id) }))
    try {
      await apiDelete(`/api/cart?itemId=${encodeURIComponent(id)}`)
    } catch {
      set({ items: prev })
    }
  },

  updateQuantity: async (id, quantity) => {
    const prev = get().items
    set((state) => ({
      items: state.items.map(i => i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) } : i),
    }))
    try {
      await apiPut('/api/cart', { itemId: id, quantity: Math.max(1, quantity) })
    } catch {
      set({ items: prev })
    }
  },

  toggleSaveForLater: (id) => set((state) => ({
    items: state.items.map(i => i.id === id ? { ...i, saveForLater: !i.saveForLater } : i),
  })),

  applyCoupon: (code, discount) => set({ couponCode: code, couponDiscount: discount }),
  removeCoupon: () => set({ couponCode: '', couponDiscount: 0 }),

  clearCart: () => set({ items: [], couponCode: '', couponDiscount: 0 }),
  clearLocal: () => set({ items: [], couponCode: '', couponDiscount: 0, synced: false }),

  getSubtotal: () => get().items.filter(i => !i.saveForLater).reduce((sum, i) => sum + (i.salePrice || i.price) * i.quantity, 0),
  getDiscount: () => {
    const subtotal = get().getSubtotal()
    return get().couponDiscount > 0 ? subtotal * (get().couponDiscount / 100) : 0
  },
  getTotal: () => {
    const subtotal = get().getSubtotal()
    const discount = get().getDiscount()
    const shipping = subtotal > 500 ? 0 : 49
    return subtotal - discount + shipping
  },
  getItemCount: () => get().items.filter(i => !i.saveForLater).reduce((sum, i) => sum + i.quantity, 0),
}))
