// src/domain/services/user.service.ts
import type { AdminUser } from '../entities/admin-user.entity'

/** Nombre completo si existe; si no, cae al username. */
export function getDisplayName(user: AdminUser): string {
  const full = [user.first_name, user.last_name].filter(Boolean).join(' ')
  return full || user.username
}