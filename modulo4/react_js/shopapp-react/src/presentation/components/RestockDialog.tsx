// src/presentation/components/admin/RestockDialog.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/presentation/components/ui/dialog'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import { Loader2, Package } from 'lucide-react'
import { useAdminStore } from '@/presentation/store/admin.store'
import { ApiException } from '@/domain/exceptions/api.exception'
import type { Product } from '@/domain/entities/product.entity'

const restockSchema = z.object({
  quantity: z.coerce
    .number({ message: 'Ingresa una cantidad válida' })
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser mayor a 0'),
})

type RestockFormValues = z.infer<typeof restockSchema>

interface RestockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

export function RestockDialog({ open, onOpenChange, product }: RestockDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const restockProduct = useAdminStore((s) => s.restockProduct)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RestockFormValues>({
    resolver: zodResolver(restockSchema as never),
    defaultValues: { quantity: 1 },
  })

  async function onSubmit({ quantity }: RestockFormValues) {
    setIsLoading(true)
    try {
      const newStock = await restockProduct(product.id, quantity)
      toast.success('Stock actualizado', {
        description: `Se agregaron ${quantity} unidades a "${product.name}". Nuevo stock: ${newStock}.`,
      })
      reset()
      onOpenChange(false)
    } catch (err) {
      const message = err instanceof ApiException ? err.detail : 'No se pudo actualizar el stock.'
      toast.error('Error', { description: message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) reset()
        onOpenChange(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Reabastecer stock
          </DialogTitle>
          <DialogDescription>{product.name}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
          <span className="text-sm text-muted-foreground">Stock actual</span>
          <Badge variant={product.stock === 0 ? 'destructive' : 'secondary'}>
            {product.stock} unidades
          </Badge>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="quantity">Cantidad a agregar</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              step="1"
              placeholder="Ej. 50"
              disabled={isLoading}
              aria-invalid={!!errors.quantity}
              {...register('quantity')}
            />
            {errors.quantity && (
              <p className="text-xs text-destructive">{errors.quantity.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                onOpenChange(false)
              }}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Guardando…' : 'Agregar al stock'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}