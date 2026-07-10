// src/domain/ports/category.repository.ts
import type { CategoryStats } from '../entities/category-stats.entity'
import type { Category } from '../entities/category.entity'

export interface CategoryRepository {
  getCategories(): Promise<Category[]>
  createCategory(payload: {
    name: string
    slug: string
    description?: string
    is_active?: boolean
  }): Promise<Category>
  updateCategory(
    id: number,
    payload: { name?: string; description?: string; is_active?: boolean },
  ): Promise<Category>
  deleteCategory(id: number): Promise<void>
  getStats(): Promise<CategoryStats>
}

