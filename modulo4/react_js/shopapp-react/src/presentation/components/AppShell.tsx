// src/presentation/components/AppShell.tsx
import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom'
import { ShoppingBag, ShoppingCart, Package, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuthStore } from '@/presentation/store/auth.store'
import { Button } from '@/presentation/components/ui/button'
import { Badge } from '@/presentation/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/presentation/components/ui/avatar'
import { Separator } from '@/presentation/components/ui/separator'
import { useCartStore } from '@/presentation/store/cart.store'
import { useEffect } from 'react'
import { useProfileStore } from '../store/profile.store'
import { UserAvatar } from './UserAvatar'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Obtiene las iniciales del username para el avatar. */
function getInitials(username: string): string {
  return username.slice(0, 2).toUpperCase()
}

/** Clases para los enlaces de navegación activos/inactivos. */
function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'text-sm font-medium transition-colors hover:text-primary',
    isActive ? 'text-primary' : 'text-muted-foreground',
  ].join(' ')
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function AppShell() {
  const navigate = useNavigate()
  const { profile, fetchProfile, clearProfile } = useProfileStore()
  const { user, logout } = useAuthStore()

  // En módulos siguientes esto vendrá del CartStore
  const cartItemCount = useCartStore((s) => s.itemCount())

  useEffect(() => {
    if (user && !profile) {
      fetchProfile()
    }
  }, [user, profile, fetchProfile])

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
          {/* Logo / marca */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-primary"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>ShopApp</span>
          </Link>

          <Separator orientation="vertical" className="h-6" />

          {/* Navegación principal */}
          <nav className="flex items-center gap-4">
            <NavLink to="/catalog" className={navLinkClass}>
              Catálogo
            </NavLink>
            {user && (
              <>
                <NavLink to="/orders" className={navLinkClass}>
                  Pedidos
                </NavLink>
                <NavLink to="/profile" className={navLinkClass}>
                  Perfil
                </NavLink>
              </>
            )}
            {user?.is_staff && (
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
            )}
          </nav>

          {/* Espacio flexible */}
          <div className="flex-1" />

          {/* Acciones del lado derecho */}
          <div className="flex items-center gap-2">
            {/* Carrito */}
            {user && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative"
                aria-label="Carrito de compras"
              >
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                    >
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            )}

            {/* Usuario autenticado → menú desplegable */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full" aria-label="Menú de usuario">
                    <UserAvatar user={profile} size="sm" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Mi perfil
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="flex items-center gap-2 cursor-pointer">
                      <Package className="h-4 w-4" />
                      Mis pedidos
                    </Link>
                  </DropdownMenuItem>

                  {user.is_staff && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                          <LayoutDashboard className="h-4 w-4" />
                          Panel Admin
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Usuario no autenticado → botón de login */
              <Button asChild size="sm">
                <Link to="/login">Iniciar sesión</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ── Contenido principal ─────────────────────────────────────────────── */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* React Router inyecta aquí el componente de la ruta activa */}
          <Outlet />
        </div>
      </main>

      {/* ── Footer mínimo ───────────────────────────────────────────────────── */}
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        ShopApp &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}