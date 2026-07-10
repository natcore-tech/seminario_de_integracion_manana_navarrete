// src/domain/entities/order-stats.entity.ts
import type { OrderStatus } from '../enums/order-status.enum'

export interface OrderStats {
  total_orders: number
  total_revenue: number
  by_status: Record<OrderStatus, number>
}