// src/application/use-cases/order.use-case.ts
import type { OrderRepository } from '@/domain/ports/order.repository'
import type { Order } from '@/domain/entities/order.entity'
import type { PaginatedResult } from '@/domain/entities/paginated-result.entity'
import type { AddItemDto } from '@/application/dtos/add-item.dto'
import type { OrderStats } from '@/domain/entities/order-stats.entity'


export class OrderUseCase {
  private readonly orderRepository: OrderRepository
    
      constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository
      }

  getOrders(page = 1): Promise<PaginatedResult<Order>> {
    return this.orderRepository.getOrders(page)
  }

  getOrder(id: number): Promise<Order> {
    return this.orderRepository.getOrder(id)
  }

  createOrder(): Promise<Order> {
    return this.orderRepository.createOrder()
  }

  addItem(orderId: number, dto: AddItemDto): Promise<Order> {
    return this.orderRepository.addItem(orderId, dto)
  }

  confirmOrder(orderId: number): Promise<Order> {
    return this.orderRepository.confirmOrder(orderId)
  }

  getStats(): Promise<OrderStats> {
    return this.orderRepository.getStats()
  }
}