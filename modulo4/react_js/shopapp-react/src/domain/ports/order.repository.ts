// src/domain/ports/order.repository.ts
import type { Order } from '../entities/order.entity'
import type { PaginatedResult } from '../entities/paginated-result.entity'

export interface OrderRepository {
  getOrders(page?: number): Promise<PaginatedResult<Order>>
  getOrder(id: number): Promise<Order>
  createOrder(): Promise<Order>
  addItem(orderId: number, payload: { product_id: number; quantity: number }): Promise<Order>
  confirmOrder(orderId: number): Promise<Order>
}