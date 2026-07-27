// src/domain/entities/cart-item.entity.ts
import type { Product } from './product.entity'

/** Un ítem dentro del carrito: el producto completo más la cantidad elegida. */
export interface CartItem {
  product: Product
  quantity: number
}