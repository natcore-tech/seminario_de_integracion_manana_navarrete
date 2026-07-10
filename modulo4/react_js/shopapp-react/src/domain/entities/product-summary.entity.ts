// src/domain/entities/product-summary.entity.ts

/**
 * Versión resumida de un producto tal y como viaja embebido dentro de un `OrderItem`.
 * El backend usa `ProductSummarySerializer` (no el `ProductSerializer` completo del módulo 4)
 * para evitar sobre-exponer datos del catálogo dentro de una orden.
 */
export interface ProductSummary {
  id: number
  name: string
  price: number
  stock: number
  is_active: boolean
  image_url: string | null
}