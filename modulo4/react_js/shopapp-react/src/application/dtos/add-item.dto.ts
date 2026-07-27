// src/application/dtos/add-item.dto.ts

/** Payload para agregar un ítem a una orden pendiente vía `POST /orders/{id}/add-item/`. */
export interface AddItemDto {
  product_id: number
  quantity: number
}