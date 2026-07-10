// src/infrastructure/factories/order.factory.ts
import { AxiosOrderRepository } from '@/infrastructure/adapters/axios-order.repository'
import { OrderUseCase } from '@/application/use-cases/order.use-case'

export const orderUseCase = new OrderUseCase(new AxiosOrderRepository())