// src/application/use-cases/product.use-case.ts
import type { ProductRepository } from '@/domain/ports/product.repository'
import type { Product } from '@/domain/entities/product.entity'
import type { PaginatedResult } from '@/domain/entities/paginated-result.entity'
import type { ProductFilters } from '@/domain/entities/product-filters.entity'

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  getProducts(filters?: Partial<ProductFilters>, page = 1): Promise<PaginatedResult<Product>> {
    return this.productRepository.getProducts(filters, page)
  }

  getProduct(id: number): Promise<Product> {
    return this.productRepository.getProduct(id)
  }
}