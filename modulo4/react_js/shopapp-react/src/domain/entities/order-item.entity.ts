// src/domain/entities/order-item.entity.ts
import type { ProductSummary } from './product-summary.entity'

/**
 * Un ítem dentro de una orden ya creada. `product` es el objeto anidado que devuelve
 * `OrderItemSerializer` (no un id suelto): el backend nunca envía un `product_name` plano.
 */
export interface OrderItem {
  id: number
  product: ProductSummary
  quantity: number
  unit_price: number
  subtotal: number
}