// src/infrastructure/adapters/axios-order.repository.ts
import { apiClient } from '@/infrastructure/http/axios-client'
import { parseApiError } from '@/infrastructure/http/parse-api-error'
import type { OrderRepository } from '@/domain/ports/order.repository'
import type { Order } from '@/domain/entities/order.entity'
import type { PaginatedResult } from '@/domain/entities/paginated-result.entity'

export class AxiosOrderRepository implements OrderRepository {
  async getOrders(page = 1): Promise<PaginatedResult<Order>> {
    try {
      const { data } = await apiClient.get<PaginatedResult<Order>>('/orders/', {
        params: { page },
      })
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async getOrder(id: number): Promise<Order> {
    try {
      const { data } = await apiClient.get<Order>(`/orders/${id}/`)
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async createOrder(): Promise<Order> {
    try {
      const { data } = await apiClient.post<Order>('/orders/', {})
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async addItem(orderId: number, payload: { product_id: number; quantity: number }): Promise<Order> {
    try {
      const { data } = await apiClient.post<Order>(`/orders/${orderId}/add-item/`, payload)
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async confirmOrder(orderId: number): Promise<Order> {
    try {
      const { data } = await apiClient.post<Order>(`/orders/${orderId}/confirm/`, {})
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }
}