// src/presentation/store/admin.store.ts
import { create } from 'zustand'
import { dashboardUseCase } from '@/infrastructure/factories/dashboard.factory'
import { categoryUseCase } from '@/infrastructure/factories/category.factory'
import { productUseCase } from '@/infrastructure/factories/product.factory'
import { ApiException } from '@/domain/exceptions/api.exception'
import type { AdminStats } from '@/domain/entities/admin-stats.entity'
import type { Category } from '@/domain/entities/category.entity'
import type { Product } from '@/domain/entities/product.entity'
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

  // ── Productos (módulo 11) ────────────────────────────────────────────────

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
}))