// src/application/dtos/create-category.dto.ts
export interface CreateCategoryDto {
  name: string
  slug: string
  description?: string
  is_active?: boolean
}