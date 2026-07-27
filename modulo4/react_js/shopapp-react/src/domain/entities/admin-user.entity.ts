// src/domain/entities/admin-user.entity.ts

/** Usuario tal como lo devuelve el panel de administración (GET/PATCH /users/{id}/). */
export interface AdminUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  is_staff: boolean
  is_active: boolean
  date_joined: string
  num_orders: number
  avatar_url: string | null
}