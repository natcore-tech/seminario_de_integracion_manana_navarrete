// src/application/use-cases/user.use-case.ts
import type { UserRepository } from '@/domain/ports/user.repository'
import type { UserProfile } from '@/domain/entities/user-profile.entity'
import type { UpdateProfileDto } from '@/application/dtos/update-profile.dto'
import type { UserStats } from '@/domain/entities/user-stats.entity'

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
}