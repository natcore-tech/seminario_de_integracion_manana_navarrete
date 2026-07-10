// src/domain/services/cart.service.ts
import type { CartItem } from '../entities/cart-item.entity'

export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.quantity, 0)
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
}

export function isCartEmpty(items: CartItem[]): boolean {
  return items.length === 0
}