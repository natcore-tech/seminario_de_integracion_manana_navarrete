// src/domain/ports/user.repository.ts
import type { UserProfile } from '../entities/user-profile.entity'
import type { UserStats } from '../entities/user-stats.entity'


export interface UserRepository {
  getProfile(): Promise<UserProfile>
  updateProfile(payload: {
    first_name?: string
    last_name?: string
    email?: string
  }): Promise<UserProfile>
  getStats(): Promise<UserStats>
}