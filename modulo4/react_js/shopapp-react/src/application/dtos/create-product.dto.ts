// src/application/dtos/create-product.dto.ts
export interface CreateProductDto {
  name: string
  description?: string
  price: number
  stock: number
  category_id: number
  is_active?: boolean
}