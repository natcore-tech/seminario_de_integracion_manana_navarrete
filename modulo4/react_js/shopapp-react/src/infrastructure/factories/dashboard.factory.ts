// src/infrastructure/factories/dashboard.factory.ts
import { DashboardUseCase } from '@/application/use-cases/dashboard.use-case'
import { categoryUseCase } from './category.factory'
import { productUseCase } from './product.factory'
import { orderUseCase } from './order.factory'
import { userUseCase } from './user.factory'

export const dashboardUseCase = new DashboardUseCase(
  categoryUseCase,
  productUseCase,
  orderUseCase,
  userUseCase,
)