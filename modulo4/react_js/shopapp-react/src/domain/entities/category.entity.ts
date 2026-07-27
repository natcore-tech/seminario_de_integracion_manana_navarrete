// src/domain/entities/category.entity.ts
export interface Category {
  id: number
  name: string
  slug: string
  description: string
  is_active: boolean
  total_products: number
  created_at: string
}