// src/presentation/store/admin.store.ts
import { create } from 'zustand'
import { dashboardUseCase } from '@/infrastructure/factories/dashboard.factory'
import type { AdminStats } from '@/domain/entities/admin-stats.entity'

interface AdminState {
  stats: AdminStats | null
  isLoadingStats: boolean
  statsError: string | null
}

interface AdminActions {
  fetchStats(): Promise<void>
}

export const useAdminStore = create<AdminState & AdminActions>((set) => ({
  stats: null,
  isLoadingStats: false,
  statsError: null,

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
}))