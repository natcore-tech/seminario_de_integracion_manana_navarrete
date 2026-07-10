// src/infrastructure/adapters/axios-user.repository.ts
import { apiClient } from '@/infrastructure/http/axios-client'
import { parseApiError } from '@/infrastructure/http/parse-api-error'
import type { UserRepository } from '@/domain/ports/user.repository'
import type { UserProfile } from '@/domain/entities/user-profile.entity'

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
}