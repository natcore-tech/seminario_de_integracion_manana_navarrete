// src/domain/ports/user.repository.ts
import type { UserProfile } from '../entities/user-profile.entity'

export interface UserRepository {
  getProfile(): Promise<UserProfile>
  updateProfile(payload: {
    first_name?: string
    last_name?: string
    email?: string
  }): Promise<UserProfile>
}