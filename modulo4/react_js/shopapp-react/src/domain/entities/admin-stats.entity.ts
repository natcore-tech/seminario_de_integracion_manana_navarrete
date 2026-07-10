// src/domain/entities/admin-stats.entity.ts

export interface AdminStats {
  total_products: number
  total_categories: number
  total_orders: number
  total_users: number
  pending_orders: number
  out_of_stock_products: number
}