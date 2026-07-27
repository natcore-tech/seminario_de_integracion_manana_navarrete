// src/application/use-cases/product.use-case.ts
import type { ProductRepository } from '@/domain/ports/product.repository'
import type { Product } from '@/domain/entities/product.entity'
import type { PaginatedResult } from '@/domain/entities/paginated-result.entity'
import type { ProductFilters } from '@/domain/entities/product-filters.entity'
import type { ProductStats } from '@/domain/entities/product-stats.entity'
import type { CreateProductDto } from '../dtos/create-product.dto'
import type { UpdateProductDto } from '../dtos/update-product.dto'


export class ProductUseCase {
  private readonly productRepository: ProductRepository
  
    constructor(productRepository: ProductRepository) {
      this.productRepository = productRepository
    }

  getProducts(filters?: Partial<ProductFilters>, page = 1): Promise<PaginatedResult<Product>> {
    return this.productRepository.getProducts(filters, page)
  }

  getProduct(id: number): Promise<Product> {
    return this.productRepository.getProduct(id)
  }

  getStats(): Promise<ProductStats> {
    return this.productRepository.getStats()
  }

  createProduct(dto: CreateProductDto): Promise<Product> {
  return this.productRepository.createProduct(dto)
  }

  updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    return this.productRepository.updateProduct(id, dto)
  }

  deleteProduct(id: number): Promise<void> {
    return this.productRepository.deleteProduct(id)
  }

  restockProduct(id: number, quantity: number): Promise<{ id: number; name: string; new_stock: number }> {
    return this.productRepository.restockProduct(id, quantity)
  }

  uploadImage(id: number, file: File): Promise<Product> {
    return this.productRepository.uploadImage(id, file)
  }
}