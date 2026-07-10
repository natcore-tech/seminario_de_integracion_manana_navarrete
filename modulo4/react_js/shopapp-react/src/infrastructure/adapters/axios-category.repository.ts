// src/infrastructure/adapters/axios-category.repository.ts
import { apiClient } from '@/infrastructure/http/axios-client'
import { parseApiError } from '@/infrastructure/http/parse-api-error'
import type { CategoryRepository } from '@/domain/ports/category.repository'
import type { Category } from '@/domain/entities/category.entity'
import type { PaginatedResult } from '@/domain/entities/paginated-result.entity'
import type { CategoryStats } from '@/domain/entities/category-stats.entity'


export class AxiosCategoryRepository implements CategoryRepository {
  async getCategories(): Promise<Category[]> {
    try {
      // page_size alto: el admin y el filtro de la tienda esperan la lista completa,
      // no una página — ver la corrección en 10.1.
      const { data } = await apiClient.get<PaginatedResult<Category>>('/categories/', {
        params: { page_size: 100 },
      })
      return data.results
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async createCategory(payload: {
    name: string
    slug: string
    description?: string
    is_active?: boolean
  }): Promise<Category> {
    try {
      const { data } = await apiClient.post<Category>('/categories/', payload)
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async updateCategory(
    id: number,
    payload: { name?: string; description?: string; is_active?: boolean },
  ): Promise<Category> {
    try {
      const { data } = await apiClient.patch<Category>(`/categories/${id}/`, payload)
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async deleteCategory(id: number): Promise<void> {
    try {
      await apiClient.delete(`/categories/${id}/`)
    } catch (err) {
      throw parseApiError(err)
    }
  }
  
  async getStats(): Promise<CategoryStats> {
    try {
        const { data } = await apiClient.get<CategoryStats>('/categories/stats/')
        return data
    } catch (err) {
        throw parseApiError(err)
    }
    }
}