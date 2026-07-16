// src/presentation/pages/profile/ProfilePage.tsx
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, ShieldCheck, ExternalLink } from 'lucide-react'

import { useAuthStore } from '@/presentation/store/auth.store'
import { useProfileStore } from '@/presentation/store/profile.store'
import { UserAvatar } from '@/presentation/components/UserAvatar'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import { Button } from '@/presentation/components/ui/button'
import { Separator } from '@/presentation/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/presentation/components/ui/tabs'
import { Badge } from '@/presentation/components/ui/badge'
import { ImageUploader } from '@/presentation/components/ImageUploader'

// ─── Schema de validación ───────────────────────────────────────────────────

const profileSchema = z.object({
  first_name: z.string().max(150, 'Máximo 150 caracteres').optional().or(z.literal('')),
  last_name: z.string().max(150, 'Máximo 150 caracteres').optional().or(z.literal('')),
  email: z.string().email('Introduce un correo electrónico válido').min(1, 'El correo es requerido'),
})

type ProfileFormData = z.infer<typeof profileSchema>

// ─── Componente ─────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const isStaff = useAuthStore((s) => s.user?.is_staff)
  const { profile, isLoading, isSaving, error, fetchProfile, updateProfile, uploadAvatar } =
    useProfileStore()

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  // Sincroniza el formulario cuando el perfil llega del backend
  useEffect(() => {
    if (profile) {
      reset({
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
      })
    }
  }, [profile, reset])

  async function handleAvatarUpload(file: File) {
    await uploadAvatar(file)
  }

  async function onSubmit(data: ProfileFormData) {
    try {
      await updateProfile({
        first_name: data.first_name || undefined,
        last_name: data.last_name || undefined,
        email: data.email,
      })
      toast.success('Perfil actualizado', {
        description: 'Tus datos se guardaron correctamente.',
      })
    } catch {
      // El error ya quedó en el store y se muestra inline debajo del formulario
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container max-w-2xl space-y-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Mi perfil</h1>

      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="edit">Editar perfil</TabsTrigger>
          <TabsTrigger value="orders">Órdenes</TabsTrigger>
        </TabsList>

        {/* ── Tab: Información ────────────────────────────────────────────── */}
        <TabsContent value="info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de cuenta</CardTitle>
              <CardDescription>Tus datos personales registrados en ShopApp.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-5">
                <UserAvatar user={profile} size="lg" />
                <ImageUploader
                  currentImageUrl={profile?.avatar_url ?? null}
                  onUpload={handleAvatarUpload}
                  circular
                  className="hidden" // el área grande se reemplaza por el flujo de abajo — ver nota
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold">
                      {profile?.first_name || profile?.last_name
                        ? `${profile?.first_name} ${profile?.last_name}`.trim()
                        : profile?.username}
                    </p>
                    {isStaff && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Staff
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">@{profile?.username}</p>
                </div>
              </div>

              <Separator />

              <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div className="space-y-1">
                  <dt className="font-medium text-muted-foreground">Correo electrónico</dt>
                  <dd>{profile?.email ?? '—'}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="font-medium text-muted-foreground">Nombre</dt>
                  <dd>{profile?.first_name || '—'}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="font-medium text-muted-foreground">Apellido</dt>
                  <dd>{profile?.last_name || '—'}</dd>
                </div>
              </dl>

              {/* Sección dedicada para cambiar el avatar */}
                <div className="flex flex-col items-center gap-3 border-t pt-6">
                  <h3 className="text-sm font-medium text-muted-foreground">Foto de perfil</h3>
                  <ImageUploader
                    currentImageUrl={profile?.avatar_url ?? null}
                    onUpload={handleAvatarUpload}
                    circular
                  />
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab: Editar perfil ──────────────────────────────────────────── */}
        <TabsContent value="edit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Editar perfil</CardTitle>
              <CardDescription>
                Actualiza tus datos personales. El nombre de usuario no se puede cambiar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="space-y-1">
                  <Label htmlFor="first_name">Nombre</Label>
                  <Input
                    id="first_name"
                    placeholder="Tu nombre"
                    aria-invalid={!!errors.first_name}
                    {...register('first_name')}
                  />
                  {errors.first_name && (
                    <p className="text-xs text-destructive">{errors.first_name.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="last_name">Apellido</Label>
                  <Input
                    id="last_name"
                    placeholder="Tu apellido"
                    aria-invalid={!!errors.last_name}
                    {...register('last_name')}
                  />
                  {errors.last_name && (
                    <p className="text-xs text-destructive">{errors.last_name.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    aria-invalid={!!errors.email}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                <Button type="submit" disabled={isSaving} className="w-full sm:w-auto">
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSaving ? 'Guardando…' : 'Guardar cambios'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab: Órdenes ─────────────────────────────────────────────────── */}
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de órdenes</CardTitle>
              <CardDescription>Consulta el estado y detalle de todos tus pedidos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Tu historial completo de compras está disponible en la sección de órdenes.
              </p>
              <Button variant="outline" asChild>
                <Link to="/orders" className="flex items-center gap-2">
                  Ver mis órdenes
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}