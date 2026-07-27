// src/domain/entities/product-stats.entity.ts

export interface ProductStats {
  total_active: number
  avg_price: number | null
  max_price: number | null
  min_price: number | null
  total_stock: number | null
  total_inactive: number
  out_of_stock: number
}