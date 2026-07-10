// src/presentation/store/admin.store.ts
import { create } from 'zustand'
import { dashboardUseCase } from '@/infrastructure/factories/dashboard.factory'
import { categoryUseCase } from '@/infrastructure/factories/category.factory'
import { ApiException } from '@/domain/exceptions/api.exception'
import type { AdminStats } from '@/domain/entities/admin-stats.entity'
import type { Category } from '@/domain/entities/category.entity'
import type { CreateCategoryDto } from '@/application/dtos/create-category.dto'
import type { UpdateCategoryDto } from '@/application/dtos/update-category.dto'

interface AdminState {
  stats: AdminStats | null
  isLoadingStats: boolean
  statsError: string | null

  categories: Category[]
  isLoadingCategories: boolean
  categoriesError: string | null
}

interface AdminActions {
  fetchStats(): Promise<void>

  fetchCategories(): Promise<void>
  createCategory(dto: CreateCategoryDto): Promise<void>
  updateCategory(id: number, dto: UpdateCategoryDto): Promise<void>
  deleteCategory(id: number): Promise<void>
}

export const useAdminStore = create<AdminState & AdminActions>((set, get) => ({
  stats: null,
  isLoadingStats: false,
  statsError: null,

  categories: [],
  isLoadingCategories: false,
  categoriesError: null,

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
}))