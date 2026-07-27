// src/presentation/pages/admin/AdminUsersPage.tsx
import { useEffect, useRef, useState } from 'react'
import { Search, ShieldCheck, User as UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import { AdminShell } from '@/presentation/components/AdminShell'
import { useAdminStore } from '@/presentation/store/admin.store'
import { useAuthStore } from '@/presentation/store/auth.store'
import { getDisplayName } from '@/domain/services/user.service'
import { ApiException } from '@/domain/exceptions/api.exception'
import { formatDate } from '@/presentation/utils/formatters'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table'
import { Badge } from '@/presentation/components/ui/badge'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { Switch } from '@/presentation/components/ui/switch'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/presentation/components/ui/alert-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/presentation/components/ui/tooltip'
import type { AdminUser } from '@/domain/entities/admin-user.entity'

const PAGE_SIZE = 10 // tamaño de página por defecto de StandardPagination (backend)
const DEBOUNCE_MS = 300 // mismo debounce usado en la búsqueda pública (módulo 5) y en productos (módulo 11)

/** Datos del cambio de rol pendiente de confirmar en el AlertDialog. */
interface PendingStaffChange {
  userId: number
  username: string
  newValue: boolean
}

export default function AdminUsersPage() {
  const adminUsers = useAdminStore((s) => s.adminUsers)
  const isLoadingUsers = useAdminStore((s) => s.isLoadingUsers)
  const usersTotal = useAdminStore((s) => s.usersTotal)
  const fetchAdminUsers = useAdminStore((s) => s.fetchAdminUsers)
  const updateUserStaffStatus = useAdminStore((s) => s.updateUserStaffStatus)
  const toggleUserActive = useAdminStore((s) => s.toggleUserActive)

  // El usuario en sesión se obtiene del auth store (módulo 3) para la auto-protección.
  const currentUserId = useAuthStore((s) => s.user?.user_id)

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [pendingStaff, setPendingStaff] = useState<PendingStaffChange | null>(null)
  const [togglingActiveId, setTogglingActiveId] = useState<number | null>(null)

  const totalPages = Math.max(1, Math.ceil(usersTotal / PAGE_SIZE))

  // Debounce del buscador — mismo patrón que AdminProductsPage (módulo 11).
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, DEBOUNCE_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [search])

  useEffect(() => {
    fetchAdminUsers(page, debouncedSearch)
  }, [fetchAdminUsers, page, debouncedSearch])

  // El switch de staff abre el AlertDialog en lugar de actuar directamente;
  // solo se guarda la intención, la acción ocurre en handleConfirmStaff.
  function handleStaffToggleIntent(user: AdminUser, newValue: boolean) {
    setPendingStaff({ userId: user.id, username: user.username, newValue })
  }

  async function handleConfirmStaff() {
    if (!pendingStaff) return
    try {
      await updateUserStaffStatus(pendingStaff.userId, pendingStaff.newValue)
    } catch (err) {
      const message = err instanceof ApiException ? err.detail : 'No se pudo actualizar el rol.'
      toast.error('Error', { description: message })
    } finally {
      setPendingStaff(null)
    }
  }

  // El switch de activo no requiere confirmación: el cambio es reversible
  // (basta con volver a pulsar el switch) y de menor impacto que el rol de staff.
  async function handleActiveToggle(user: AdminUser) {
    setTogglingActiveId(user.id)
    try {
      await toggleUserActive(user.id)
    } catch (err) {
      const message = err instanceof ApiException ? err.detail : 'No se pudo cambiar el estado.'
      toast.error('Error', { description: message })
    } finally {
      setTogglingActiveId(null)
    }
  }

  const isSelf = (userId: number) => userId === currentUserId
  const skeletonRows = Array.from({ length: 8 })

  return (
    <AdminShell>
      <TooltipProvider>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Usuarios</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {usersTotal} {usersTotal === 1 ? 'usuario registrado' : 'usuarios registrados'}
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por usuario o email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Nombre completo</TableHead>
                  <TableHead>Órdenes</TableHead>
                  <TableHead className="w-28 text-center">Rol</TableHead>
                  <TableHead className="w-28 text-center">Estado</TableHead>
                  <TableHead className="w-36">Miembro desde</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingUsers ? (
                  skeletonRows.map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 7 }).map((__, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-5 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : adminUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                      No se encontraron usuarios con ese criterio de búsqueda.
                    </TableCell>
                  </TableRow>
                ) : (
                  adminUsers.map((user) => {
                    const self = isSelf(user.id)
                    const activeToggling = togglingActiveId === user.id

                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                              <UserIcon className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">{user.username}</span>
                            {self && (
                              <Badge variant="outline" className="h-5 px-1 text-xs">
                                Tú
                              </Badge>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                        <TableCell className="text-sm">{getDisplayName(user)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{user.num_orders}</TableCell>

                        <TableCell>
                          <div className="flex flex-col items-center gap-1.5">
                            {user.is_staff ? (
                              <Badge className="gap-1 bg-purple-100 text-xs text-purple-700 hover:bg-purple-100">
                                <ShieldCheck className="h-3 w-3" />
                                Staff
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                Cliente
                              </Badge>
                            )}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span>
                                  <Switch
                                    checked={user.is_staff}
                                    disabled={self}
                                    onCheckedChange={(val) => handleStaffToggleIntent(user, val)}
                                    aria-label={`Cambiar rol de ${user.username}`}
                                    className="data-[state=checked]:bg-purple-600"
                                  />
                                </span>
                              </TooltipTrigger>
                              {self && <TooltipContent>No puedes cambiar tu propio rol</TooltipContent>}
                            </Tooltip>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col items-center gap-1.5">
                            {user.is_active ? (
                              <Badge variant="outline" className="border-green-300 text-xs text-green-700">
                                Activo
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-red-300 text-xs text-red-600">
                                Inactivo
                              </Badge>
                            )}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span>
                                  <Switch
                                    checked={user.is_active}
                                    disabled={self || activeToggling}
                                    onCheckedChange={() => handleActiveToggle(user)}
                                    aria-label={`${user.is_active ? 'Desactivar' : 'Activar'} cuenta de ${user.username}`}
                                    className="data-[state=checked]:bg-green-600"
                                  />
                                </span>
                              </TooltipTrigger>
                              {self && <TooltipContent>No puedes desactivar tu propia cuenta</TooltipContent>}
                            </Tooltip>
                          </div>
                        </TableCell>

                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(user.date_joined)}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Página {page} de {totalPages}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </div>

        <AlertDialog open={pendingStaff !== null} onOpenChange={(open) => !open && setPendingStaff(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar cambio de rol</AlertDialogTitle>
              <AlertDialogDescription>
                {pendingStaff?.newValue
                  ? `¿Deseas otorgar permisos de administrador (staff) a "${pendingStaff?.username}"? Este usuario podrá acceder al panel de administración y gestionar órdenes, productos y otros usuarios.`
                  : `¿Deseas remover los permisos de administrador (staff) de "${pendingStaff?.username}"? Este usuario ya no podrá acceder al panel de administración.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmStaff}
                className={
                  pendingStaff?.newValue
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-destructive hover:bg-destructive/90'
                }
              >
                {pendingStaff?.newValue ? 'Otorgar permisos' : 'Remover permisos'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TooltipProvider>
    </AdminShell>
  )
}