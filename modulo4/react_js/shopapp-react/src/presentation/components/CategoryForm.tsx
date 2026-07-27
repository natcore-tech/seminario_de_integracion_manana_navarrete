// src/presentation/components/admin/CategoryForm.tsx
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'

import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { Textarea } from '@/presentation/components/ui/textarea'
import { Switch } from '@/presentation/components/ui/switch'
import { Button } from '@/presentation/components/ui/button'

// ─── Schema de validación ───────────────────────────────────────────────────

const categorySchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional().or(z.literal('')),
  is_active: z.boolean(),
})

export type CategoryFormValues = z.infer<typeof categorySchema>

// ─── Props ──────────────────────────────────────────────────────────────────

interface CategoryFormProps {
  defaultValues?: Partial<CategoryFormValues>
  onSubmit: (data: CategoryFormValues) => Promise<void>
  isLoading?: boolean
}

// ─── Componente ─────────────────────────────────────────────────────────────

export function CategoryForm({ defaultValues, onSubmit, isLoading = false }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      is_active: defaultValues?.is_active ?? true,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          placeholder="Ej. Electrónica"
          disabled={isLoading}
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">
          Descripción <span className="text-xs text-muted-foreground">(opcional)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe brevemente esta categoría..."
          rows={3}
          disabled={isLoading}
          aria-invalid={!!errors.description}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      <Controller
        control={control}
        name="is_active"
        render={({ field }) => (
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <Label htmlFor="is_active">Categoría activa</Label>
              <p className="text-xs text-muted-foreground">
                Las categorías inactivas no aparecen en el filtro de la tienda.
              </p>
            </div>
            <Switch
              id="is_active"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading}
            />
          </div>
        )}
      />

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Guardando…' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}