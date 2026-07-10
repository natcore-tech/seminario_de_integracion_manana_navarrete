// src/application/use-cases/category.use-case.ts
import type { CategoryRepository } from '@/domain/ports/category.repository'
import type { Category } from '@/domain/entities/category.entity'

export class CategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getCategories(): Promise<Category[]> {
    return this.categoryRepository.getCategories()
  }
}