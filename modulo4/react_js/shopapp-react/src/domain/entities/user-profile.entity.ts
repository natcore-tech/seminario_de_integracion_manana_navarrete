// src/domain/entities/user-profile.entity.ts

/**
 * Perfil del usuario autenticado, tal como lo devuelve GET /users/profile/
 * (acción `profile` de UserViewSet, serializada con UserProfileSerializer).
 * No incluye `is_staff` ni `date_joined` — esos datos ya están disponibles en
 * `LoggedUser` (módulo 3) a través de `authStore`, y no los duplica el backend
 * en este endpoint.
 */
export interface UserProfile {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  avatar_url: string | null
}