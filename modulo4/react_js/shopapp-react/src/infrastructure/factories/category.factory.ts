// src/infrastructure/factories/category.factory.ts
import { AxiosCategoryRepository } from '@/infrastructure/adapters/axios-category.repository'
import { CategoryUseCase } from '@/application/use-cases/category.use-case'

export const categoryUseCase = new CategoryUseCase(new AxiosCategoryRepository())