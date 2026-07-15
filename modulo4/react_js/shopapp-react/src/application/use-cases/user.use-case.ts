// src/application/use-cases/user.use-case.ts
import type { UserRepository } from '@/domain/ports/user.repository'
import type { UserProfile } from '@/domain/entities/user-profile.entity'
import type { UpdateProfileDto } from '@/application/dtos/update-profile.dto'
import type { UserStats } from '@/domain/entities/user-stats.entity'
import type { PaginatedResult } from '@/domain/entities/paginated-result.entity'
import type { AdminUser } from '@/domain/entities/admin-user.entity'

export class UserUseCase {
  private readonly userRepository: UserRepository
    
      constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
      }

  getProfile(): Promise<UserProfile> {
    return this.userRepository.getProfile()
  }

  updateProfile(dto: UpdateProfileDto): Promise<UserProfile> {
    return this.userRepository.updateProfile(dto)
  }

  getStats(): Promise<UserStats> {
    return this.userRepository.getStats()
  }

  getUsers(page = 1, search?: string): Promise<PaginatedResult<AdminUser>> {
    return this.userRepository.getUsers(page, search)
  }

  updateUserStaffStatus(id: number, isStaff: boolean): Promise<AdminUser> {
    return this.userRepository.updateUserStaffStatus(id, isStaff)
  }

  toggleUserActive(id: number): Promise<{ is_active: boolean }> {
    return this.userRepository.toggleUserActive(id)
  }
}