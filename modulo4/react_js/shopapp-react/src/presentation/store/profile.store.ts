// src/presentation/store/profile.store.ts
import { create } from 'zustand'
import { ApiException } from '@/domain/exceptions/api.exception'
import type { UserProfile } from '@/domain/entities/user-profile.entity'
import type { UpdateProfileDto } from '@/application/dtos/update-profile.dto'
import { userUseCase } from '@/infrastructure/factories/user.factory'

interface ProfileState {
  profile: UserProfile | null
  isLoading: boolean
  isSaving: boolean
  error: string | null
}

interface ProfileActions {
  fetchProfile(): Promise<void>
  updateProfile(dto: UpdateProfileDto): Promise<void>
  clearProfile(): void
  clearError(): void
  uploadAvatar(file: File): Promise<void>
}

export const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
  profile: null,
  isLoading: false,
  isSaving: false,
  error: null,

  async fetchProfile() {
    set({ isLoading: true, error: null })
    try {
      const profile = await userUseCase.getProfile()
      set({ profile })
    } catch {
      set({ error: 'No se pudo cargar el perfil.' })
    } finally {
      set({ isLoading: false })
    }
  },

  async updateProfile(dto) {
    set({ isSaving: true, error: null })
    try {
      const profile = await userUseCase.updateProfile(dto)
      set({ profile })
    } catch (err) {
      const message = err instanceof ApiException ? err.detail : 'No se pudo actualizar el perfil.'
      set({ error: message })
      throw err
    } finally {
      set({ isSaving: false })
    }
  },

  clearProfile() {
    set({ profile: null, error: null })
  },

  clearError() {
    set({ error: null })
  },

  async uploadAvatar(file) {
    try {
      const profile = await userUseCase.uploadAvatar(file)
      set({ profile })
    } catch (err) {
      const message = err instanceof ApiException ? err.detail : 'No se pudo subir el avatar.'
      set({ error: message })
      throw err
    }
  },
}))