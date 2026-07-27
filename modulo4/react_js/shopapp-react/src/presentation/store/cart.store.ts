// src/presentation/store/cart.store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { calculateItemCount, calculateSubtotal, isCartEmpty } from '@/domain/services/cart.service'
import type { CartItem } from '@/domain/entities/cart-item.entity'
import type { Product } from '@/domain/entities/product.entity'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

interface CartActions {
  itemCount(): number
  subtotal(): number
  isEmpty(): boolean
  addItem(product: Product, quantity?: number): void
  removeItem(productId: number): void
  updateQuantity(productId: number, quantity: number): void
  clearCart(): void
  toggleCart(): void
  openCart(): void
  closeCart(): void
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      itemCount: () => calculateItemCount(get().items),
      subtotal: () => calculateSubtotal(get().items),
      isEmpty: () => isCartEmpty(get().items),

      addItem(product, quantity = 1) {
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id)

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            }
          }

          return { items: [...state.items, { product, quantity }] }
        })
      },

      removeItem(productId) {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      updateQuantity(productId, quantity) {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        }))
      },

      clearCart() {
        set({ items: [] })
      },

      toggleCart() {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      openCart() {
        set({ isOpen: true })
      },

      closeCart() {
        set({ isOpen: false })
      },
    }),
    {
      name: 'shopapp_cart',
      storage: createJSONStorage(() => localStorage),
      // Solo persistimos los ítems; isOpen siempre arranca en false.
      partialize: (state) => ({ items: state.items }),
    },
  ),
)