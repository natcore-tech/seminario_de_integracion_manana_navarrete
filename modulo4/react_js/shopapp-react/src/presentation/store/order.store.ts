// src/presentation/store/order.store.ts
import { create } from 'zustand'
import { orderUseCase } from '@/infrastructure/factories/order.factory'
import { useCartStore } from '@/presentation/store/cart.store'
import type { Order } from '@/domain/entities/order.entity'
import type { CartItem } from '@/domain/entities/cart-item.entity'

interface OrderState {
  orders: Order[]
  ordersTotal: number
  currentPage: number
  currentOrder: Order | null
  isLoading: boolean
  error: string | null
}

interface OrderActions {
  fetchOrders(page?: number): Promise<void>
  fetchOrderById(id: number): Promise<void>
  setPage(page: number): void
  placeOrder(cartItems: CartItem[]): Promise<Order>
  clearError(): void
}

export const useOrderStore = create<OrderState & OrderActions>((set) => ({
  orders: [],
  ordersTotal: 0,
  currentPage: 1,
  currentOrder: null,
  isLoading: false,
  error: null,

  async fetchOrders(page = 1) {
    set({ isLoading: true, error: null })
    try {
      const data = await orderUseCase.getOrders(page)
      set({ orders: data.results, ordersTotal: data.count, currentPage: page })
    } catch {
      set({ error: 'No se pudieron cargar las órdenes.' })
    } finally {
      set({ isLoading: false })
    }
  },

  async fetchOrderById(id) {
    set({ isLoading: true, error: null, currentOrder: null })
    try {
      const order = await orderUseCase.getOrder(id)
      set({ currentOrder: order })
    } catch {
      set({ error: `No se pudo cargar la orden #${id}.` })
    } finally {
      set({ isLoading: false })
    }
  },

  setPage(page) {
    set({ currentPage: page })
  },

  /**
   * Convierte el carrito en una orden siguiendo el flujo granular real del backend:
   * 1) crea una orden vacía en estado `pending`,
   * 2) agrega cada ítem del carrito uno por uno, **secuencialmente** (no con `Promise.all`),
   *    porque cada `add-item` descuenta stock y recalcula `total` en el servidor — dispararlos en
   *    paralelo arriesgaría condiciones de carrera sobre la misma orden,
   * 3) confirma la orden, que la deja en `confirmed` con el total ya calculado.
   * Si algún paso falla (p. ej. stock insuficiente en `add-item`), la orden queda a medio construir
   * en estado `pending` en el backend; se relanza el error para que `CheckoutPage` lo muestre.
   */
  async placeOrder(cartItems) {
    set({ isLoading: true, error: null })
    try {
      let order = await orderUseCase.createOrder()

      for (const item of cartItems) {
        order = await orderUseCase.addItem(order.id, {
          product_id: item.product.id,
          quantity: item.quantity,
        })
      }

      order = await orderUseCase.confirmOrder(order.id)

      set((state) => ({
        orders: [order, ...state.orders],
        currentOrder: order,
      }))

      // Vacía el carrito una vez que la orden se confirmó en el backend
      useCartStore.getState().clearCart()

      return order
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo completar el pedido.'
      set({ error: message })
      throw err
    } finally {
      set({ isLoading: false })
    }
  },

  clearError() {
    set({ error: null })
  },
}))