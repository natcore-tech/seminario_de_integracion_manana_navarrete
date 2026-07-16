// src/infrastructure/adapters/axios-product.repository.ts
import { apiClient } from '@/infrastructure/http/axios-client'
import { parseApiError } from '@/infrastructure/http/parse-api-error'
import type { ProductRepository } from '@/domain/ports/product.repository'
import type { Product } from '@/domain/entities/product.entity'
import type { PaginatedResult } from '@/domain/entities/paginated-result.entity'
import type { ProductFilters } from '@/domain/entities/product-filters.entity'
import type { ProductStats } from '@/domain/entities/product-stats.entity'

type CreateProductPayload = Parameters<ProductRepository['createProduct']>[0]

export class AxiosProductRepository implements ProductRepository {
  
  async getProducts(
    filters?: Partial<ProductFilters>,
    page = 1,
  ): Promise<PaginatedResult<Product>> {
    const params: Record<string, string | number> = { page, page_size: 12 }



    if (filters?.search) {
      params.search = filters.search
    }
    if (filters?.categoryId !== undefined && filters.categoryId !== null) {
      params.category = filters.categoryId
    }
    if (filters?.ordering) {
      params.ordering = filters.ordering
    }

    try {
      const { data } = await apiClient.get<PaginatedResult<Product>>('/products/', { params })
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const { data } = await apiClient.get<Product>(`/products/${id}/`)
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }
  
  async getStats(): Promise<ProductStats> {
    try {
      const { data } = await apiClient.get<ProductStats>('/products/stats/')
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async createProduct(payload: CreateProductPayload): Promise<Product> {
    try {
      const { data } = await apiClient.post<Product>('/products/', payload)
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async updateProduct(id: number, payload: Partial<CreateProductPayload>): Promise<Product> {
    try {
      const { data } = await apiClient.patch<Product>(`/products/${id}/`, payload)
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await apiClient.delete(`/products/${id}/`)
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async restockProduct(
    id: number,
    quantity: number,
  ): Promise<{ id: number; name: string; new_stock: number }> {
    try {
      const { data } = await apiClient.post<{ id: number; name: string; new_stock: number }>(
        `/products/${id}/restock/`,
        { quantity },
      )
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async uploadImage(id: number, file: File): Promise<Product> {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const { data } = await apiClient.patch<Product>(`/products/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }
}
