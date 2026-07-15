// src/presentation/store/admin.store.ts
import { create } from 'zustand'
import { dashboardUseCase } from '@/infrastructure/factories/dashboard.factory'
import { categoryUseCase } from '@/infrastructure/factories/category.factory'
import { productUseCase } from '@/infrastructure/factories/product.factory'
import { orderUseCase } from '@/infrastructure/factories/order.factory'
import { userUseCase } from '@/infrastructure/factories/user.factory'
import { ApiException } from '@/domain/exceptions/api.exception'
import type { AdminStats } from '@/domain/entities/admin-stats.entity'
import type { Category } from '@/domain/entities/category.entity'
import type { Product } from '@/domain/entities/product.entity'
import type { Order } from '@/domain/entities/order.entity'
import type { OrderStatus } from '@/domain/enums/order-status.enum'
import type { AdminUser } from '@/domain/entities/admin-user.entity'
import type { CreateCategoryDto } from '@/application/dtos/create-category.dto'
import type { UpdateCategoryDto } from '@/application/dtos/update-category.dto'
import type { CreateProductDto } from '@/application/dtos/create-product.dto'
import type { UpdateProductDto } from '@/application/dtos/update-product.dto'

interface AdminState {
  stats: AdminStats | null
  isLoadingStats: boolean
  statsError: string | null

  categories: Category[]
  isLoadingCategories: boolean
  categoriesError: string | null

  products: Product[]
  productsTotal: number
  isLoadingProducts: boolean
  productsError: string | null

  adminOrders: Order[]
  ordersTotal: number
  isLoadingOrders: boolean
  ordersError: string | null
  ordersStatusFilter: OrderStatus | ''
  ordersPage: number

  adminUsers: AdminUser[]
  usersTotal: number
  isLoadingUsers: boolean
  usersError: string | null
}

interface AdminActions {
  fetchStats(): Promise<void>

  fetchCategories(): Promise<void>
  createCategory(dto: CreateCategoryDto): Promise<void>
  updateCategory(id: number, dto: UpdateCategoryDto): Promise<void>
  deleteCategory(id: number): Promise<void>

  fetchProducts(page?: number, search?: string): Promise<void>
  createProduct(dto: CreateProductDto): Promise<void>
  updateProduct(id: number, dto: UpdateProductDto): Promise<void>
  deleteProduct(id: number): Promise<void>
  restockProduct(id: number, quantity: number): Promise<number>

  fetchAdminOrders(): Promise<void>
  setOrdersStatusFilter(status: OrderStatus | ''): void
  setOrdersPage(page: number): void
  updateOrderStatus(id: number, status: OrderStatus): Promise<void>

  fetchAdminUsers(page?: number, search?: string): Promise<void>
  updateUserStaffStatus(id: number, isStaff: boolean): Promise<void>
  toggleUserActive(id: number): Promise<void>
}

export const useAdminStore = create<AdminState & AdminActions>((set, get) => ({
  stats: null,
  isLoadingStats: false,
  statsError: null,

  categories: [],
  isLoadingCategories: false,
  categoriesError: null,

  products: [],
  productsTotal: 0,
  isLoadingProducts: false,
  productsError: null,

  adminOrders: [],
  ordersTotal: 0,
  isLoadingOrders: false,
  ordersError: null,
  ordersStatusFilter: '',
  ordersPage: 1,

  adminUsers: [],
  usersTotal: 0,
  isLoadingUsers: false,
  usersError: null,

  async fetchStats() {
    set({ isLoadingStats: true, statsError: null })
    try {
      const stats = await dashboardUseCase.getStats()
      set({ stats })
    } catch {
      set({ statsError: 'No se pudieron cargar las estadísticas.' })
    } finally {
      set({ isLoadingStats: false })
    }
  },

  async fetchCategories() {
    set({ isLoadingCategories: true, categoriesError: null })
    try {
      const categories = await categoryUseCase.getCategories()
      set({ categories })
    } catch {
      set({ categoriesError: 'No se pudieron cargar las categorías.' })
    } finally {
      set({ isLoadingCategories: false })
    }
  },

  async createCategory(dto) {
    try {
      const category = await categoryUseCase.createCategory(dto)
      set({ categories: [...get().categories, category] })
    } catch (err) {
      throw err instanceof ApiException ? err : new Error('No se pudo crear la categoría.')
    }
  },

  async updateCategory(id, dto) {
    try {
      const updated = await categoryUseCase.updateCategory(id, dto)
      set({ categories: get().categories.map((c) => (c.id === id ? updated : c)) })
    } catch (err) {
      throw err instanceof ApiException ? err : new Error('No se pudo actualizar la categoría.')
    }
  },

  async deleteCategory(id) {
    try {
      await categoryUseCase.deleteCategory(id)
      set({ categories: get().categories.filter((c) => c.id !== id) })
    } catch (err) {
      throw err instanceof ApiException ? err : new Error('No se pudo eliminar la categoría.')
    }
  },

  async fetchProducts(page = 1, search = '') {
    set({ isLoadingProducts: true, productsError: null })
    try {
      const data = await productUseCase.getProducts({ search }, page)
      set({ products: data.results, productsTotal: data.count })
    } catch {
      set({ productsError: 'No se pudieron cargar los productos.' })
    } finally {
      set({ isLoadingProducts: false })
    }
  },

  async createProduct(dto) {
    try {
      const product = await productUseCase.createProduct(dto)
      set({ products: [product, ...get().products], productsTotal: get().productsTotal + 1 })
    } catch (err) {
      throw err instanceof ApiException ? err : new Error('No se pudo crear el producto.')
    }
  },

  async updateProduct(id, dto) {
    try {
      const updated = await productUseCase.updateProduct(id, dto)
      set({ products: get().products.map((p) => (p.id === id ? updated : p)) })
    } catch (err) {
      throw err instanceof ApiException ? err : new Error('No se pudo actualizar el producto.')
    }
  },

  async deleteProduct(id) {
    try {
      await productUseCase.deleteProduct(id)
      set({
        products: get().products.filter((p) => p.id !== id),
        productsTotal: get().productsTotal - 1,
      })
    } catch (err) {
      throw err instanceof ApiException ? err : new Error('No se pudo eliminar el producto.')
    }
  },

  async restockProduct(id, quantity) {
    try {
      const result = await productUseCase.restockProduct(id, quantity)
      set({
        products: get().products.map((p) => (p.id === id ? { ...p, stock: result.new_stock } : p)),
      })
      return result.new_stock
    } catch (err) {
      throw err instanceof ApiException ? err : new Error('No se pudo actualizar el stock.')
    }
  },

  async fetchAdminOrders() {
    const { ordersPage, ordersStatusFilter } = get()
    set({ isLoadingOrders: true, ordersError: null })
    try {
      const data = await orderUseCase.getOrders(ordersPage, ordersStatusFilter || undefined)
      set({ adminOrders: data.results, ordersTotal: data.count })
    } catch {
      set({ ordersError: 'No se pudieron cargar las órdenes.' })
    } finally {
      set({ isLoadingOrders: false })
    }
  },

  setOrdersStatusFilter(status) {
    set({ ordersStatusFilter: status, ordersPage: 1 })
  },

  setOrdersPage(page) {
    set({ ordersPage: page })
  },

  async updateOrderStatus(id, status) {
    try {
      const updated = await orderUseCase.updateOrderStatus(id, status)
      set({ adminOrders: get().adminOrders.map((o) => (o.id === id ? updated : o)) })
    } catch (err) {
      throw err instanceof ApiException ? err : new Error('No se pudo actualizar el estado de la orden.')
    }
  },

  // ── Usuarios (módulo 13) ─────────────────────────────────────────────────

  async fetchAdminUsers(page = 1, search = '') {
    set({ isLoadingUsers: true, usersError: null })
    try {
      const data = await userUseCase.getUsers(page, search || undefined)
      set({ adminUsers: data.results, usersTotal: data.count })
    } catch {
      set({ usersError: 'No se pudieron cargar los usuarios.' })
    } finally {
      set({ isLoadingUsers: false })
    }
  },

  async updateUserStaffStatus(id, isStaff) {
    try {
      const updated = await userUseCase.updateUserStaffStatus(id, isStaff)
      set({ adminUsers: get().adminUsers.map((u) => (u.id === id ? updated : u)) })
    } catch (err) {
      throw err instanceof ApiException ? err : new Error('No se pudo actualizar el rol del usuario.')
    }
  },

  async toggleUserActive(id) {
    try {
      const { is_active } = await userUseCase.toggleUserActive(id)
      set({
        adminUsers: get().adminUsers.map((u) => (u.id === id ? { ...u, is_active } : u)),
      })
    } catch (err) {
      throw err instanceof ApiException ? err : new Error('No se pudo cambiar el estado del usuario.')
    }
  },
}))