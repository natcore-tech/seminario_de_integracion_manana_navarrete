// src/domain/enums/order-status.enum.ts

/** Estados posibles de una orden. Deben coincidir con `Order.STATUS_CHOICES` del backend Django. */
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'