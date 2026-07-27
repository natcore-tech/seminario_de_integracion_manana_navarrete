// src/domain/ports/user.repository.ts
import type { UserProfile } from '../entities/user-profile.entity'
import type { AdminUser } from '../entities/admin-user.entity'
import type { PaginatedResult } from '../entities/paginated-result.entity'

export interface UserRepository {
  getProfile(): Promise<UserProfile>
  updateProfile(payload: {
    first_name?: string
    last_name?: string
    email?: string
  }): Promise<UserProfile>

  getUsers(page?: number, search?: string): Promise<PaginatedResult<AdminUser>>
  updateUserStaffStatus(id: number, isStaff: boolean): Promise<AdminUser>
  toggleUserActive(id: number): Promise<{ is_active: boolean }>
  uploadAvatar(file: File): Promise<UserProfile>
  
}