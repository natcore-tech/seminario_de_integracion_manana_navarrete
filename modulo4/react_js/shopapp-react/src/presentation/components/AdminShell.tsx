// src/presentation/components/AdminShell.tsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Tag, Package, ShoppingCart, Users, Menu, ArrowLeft } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import { Separator } from '@/presentation/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/presentation/components/ui/sheet'
import { cn } from '@/presentation/utils/cn'

// ─── Enlaces de navegación ────────────────────────────────────────────────────

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Categorías', href: '/admin/categories', icon: Tag },
  { label: 'Productos', href: '/admin/products', icon: Package },
  { label: 'Órdenes', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Usuarios', href: '/admin/users', icon: Users },
]

interface SideNavLinkProps {
  item: NavItem
  currentPath: string
  onClick?: () => void
}

function SideNavLink({ item, currentPath, onClick }: SideNavLinkProps) {
  const isActive =
    item.href === '/admin' ? currentPath === '/admin' : currentPath.startsWith(item.href)
  const Icon = item.icon

  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {item.label}
    </Link>
  )
}

interface SidebarContentProps {
  currentPath: string
  onLinkClick?: () => void
}

function SidebarContent({ currentPath, onLinkClick }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="px-3 py-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Panel Admin
        </h2>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => (
          <SideNavLink key={item.href} item={item} currentPath={currentPath} onClick={onLinkClick} />
        ))}
      </nav>

      <div className="px-2 pb-4">
        <Separator className="mb-4" />
        <Link
          to="/"
          onClick={onLinkClick}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Volver a la tienda
        </Link>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  const { pathname } = useLocation()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      <aside className="hidden w-56 shrink-0 flex-col border-r bg-card md:flex">
        <SidebarContent currentPath={pathname} />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b px-4 md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-56 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Navegación de administración</SheetTitle>
              </SheetHeader>
              <SidebarContent currentPath={pathname} onLinkClick={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="text-sm font-semibold">Panel Admin</span>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}