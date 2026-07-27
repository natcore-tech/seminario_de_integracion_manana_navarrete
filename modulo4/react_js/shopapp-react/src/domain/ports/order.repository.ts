// src/domain/ports/order.repository.ts
import type { Order } from '../entities/order.entity'
import type { OrderStatus } from '../enums/order-status.enum'
import type { PaginatedResult } from '../entities/paginated-result.entity'

export interface OrderRepository {
  getOrders(page?: number, status?: OrderStatus): Promise<PaginatedResult<Order>>
  getOrder(id: number): Promise<Order>
  createOrder(): Promise<Order>
  addItem(orderId: number, payload: { product_id: number; quantity: number }): Promise<Order>
  confirmOrder(orderId: number): Promise<Order>
  updateOrderStatus(id: number, status: OrderStatus): Promise<Order>
}