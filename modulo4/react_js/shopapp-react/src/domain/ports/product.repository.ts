// src/domain/ports/product.repository.ts
import type { Product } from '../entities/product.entity'
import type { PaginatedResult } from '../entities/paginated-result.entity'
import type { ProductFilters } from '../entities/product-filters.entity'
import type { ProductStats } from '../entities/product-stats.entity'

export interface ProductRepository {
  getProducts(filters?: Partial<ProductFilters>, page?: number): Promise<PaginatedResult<Product>>
  getProduct(id: number): Promise<Product>
  getStats(): Promise<ProductStats>

  // ── Añadido en el módulo 11 ─────────────────────────────────────────────
  createProduct(payload: {
    name: string
    description?: string
    price: number
    stock: number
    category_id: number
    is_active?: boolean
  }): Promise<Product>
  updateProduct(
    id: number,
    payload: Partial<{
      name: string
      description: string
      price: number
      stock: number
      category_id: number
      is_active: boolean
    }>,
  ): Promise<Product>
  deleteProduct(id: number): Promise<void>
  restockProduct(id: number, quantity: number): Promise<{ id: number; name: string; new_stock: number }>
  uploadImage(id: number, file: File): Promise<Product>
}