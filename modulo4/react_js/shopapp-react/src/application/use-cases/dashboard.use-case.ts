// src/application/use-cases/dashboard.use-case.ts
import type { CategoryUseCase } from './category.use-case'
import type { ProductUseCase } from './product.use-case'
import type { OrderUseCase } from './order.use-case'
import type { UserUseCase } from './user.use-case'
import type { AdminStats } from '@/domain/entities/admin-stats.entity'

export class DashboardUseCase {
  private readonly categoryUseCase: CategoryUseCase
  private readonly productUseCase: ProductUseCase
  private readonly orderUseCase: OrderUseCase
  private readonly userUseCase: UserUseCase

  constructor(
    categoryUseCase: CategoryUseCase,
    productUseCase: ProductUseCase,
    orderUseCase: OrderUseCase,
    userUseCase: UserUseCase,
  ) {
    this.categoryUseCase = categoryUseCase
    this.productUseCase = productUseCase
    this.orderUseCase = orderUseCase
    this.userUseCase = userUseCase
  }

  async getStats(): Promise<AdminStats> {
    const [categoryStats, productStats, orderStats, userStats] = await Promise.all([
      this.categoryUseCase.getStats(),
      this.productUseCase.getStats(),
      this.orderUseCase.getStats(),
      this.userUseCase.getStats(),
    ])

    return {
      total_products: productStats.total_active,
      total_categories: categoryStats.total,
      total_orders: orderStats.total_orders,
      total_users: userStats.total,
      pending_orders: orderStats.by_status.pending,
      out_of_stock_products: productStats.out_of_stock,
    }
  }
}