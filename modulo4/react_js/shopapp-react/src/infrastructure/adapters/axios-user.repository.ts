// src/infrastructure/adapters/axios-user.repository.ts
import { apiClient } from '@/infrastructure/http/axios-client'
import { parseApiError } from '@/infrastructure/http/parse-api-error'
import type { UserRepository } from '@/domain/ports/user.repository'
import type { UserProfile } from '@/domain/entities/user-profile.entity'
import type { UserStats } from '@/domain/entities/user-stats.entity'
import type { PaginatedResult } from '@/domain/entities/paginated-result.entity'
import type { AdminUser } from '@/domain/entities/admin-user.entity'


export class AxiosUserRepository implements UserRepository {
  async getProfile(): Promise<UserProfile> {
    try {
      const { data } = await apiClient.get<UserProfile>('/users/profile/')
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async updateProfile(payload: {
    first_name?: string
    last_name?: string
    email?: string
  }): Promise<UserProfile> {
    try {
      const { data } = await apiClient.patch<UserProfile>('/users/profile/', payload)
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async getStats(): Promise<UserStats> {
    try {
      const { data } = await apiClient.get<UserStats>('/users/stats/')
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async getUsers(page = 1, search?: string): Promise<PaginatedResult<AdminUser>> {
    try {
      const params: Record<string, string | number> = { page }
      if (search) params.search = search
      const { data } = await apiClient.get<PaginatedResult<AdminUser>>('/users/', { params })
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async updateUserStaffStatus(id: number, isStaff: boolean): Promise<AdminUser> {
    try {
      const { data } = await apiClient.patch<AdminUser>(`/users/${id}/`, { is_staff: isStaff })
      return data
    } catch (err) {
      throw parseApiError(err)
    }
  }

  async toggleUserActive(id: number): Promise<{ is_active: boolean }> {
    try {
      const { data } = await apiClient.post<{ message: string; is_active: boolean }>(
        `/users/${id}/toggle-active/`,
        {},
      )
      return { is_active: data.is_active }
    } catch (err) {
      throw parseApiError(err)
    }
  }

}