// src/application/dtos/update-product.dto.ts
export interface UpdateProductDto {
  name?: string
  description?: string
  price?: number
  stock?: number
  category_id?: number
  is_active?: boolean
}