// src/domain/entities/order.entity.ts
import type { OrderStatus } from '../enums/order-status.enum'
import type { OrderItem } from './order-item.entity'

/** Una orden completa tal y como la devuelve el backend. */
export interface Order {
  id: number
  /** Nombre de usuario del dueño de la orden. El backend NO expone el id numérico del usuario. */
  username: string
  status: OrderStatus
  total: number
  /** Cantidad de líneas de ítems distintas (`SerializerMethodField`, no la suma de cantidades). */
  num_items: number
  items: OrderItem[]
  created_at: string
  updated_at: string
}