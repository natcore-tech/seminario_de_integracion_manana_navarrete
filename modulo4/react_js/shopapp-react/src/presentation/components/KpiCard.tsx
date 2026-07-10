// src/presentation/components/KpiCard.tsx
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { cn } from '@/presentation/utils/cn'

export interface KpiCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  description?: string
  variant?: 'default' | 'warning' | 'danger'
}

const variantStyles = {
  default: {
    card: 'border-border',
    iconWrapper: 'bg-primary/10 text-primary',
  },
  warning: {
    card: 'border-amber-400 dark:border-amber-500',
    iconWrapper: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  },
  danger: {
    card: 'border-destructive',
    iconWrapper: 'bg-destructive/10 text-destructive',
  },
}

export function KpiCard({ title, value, icon: Icon, description, variant = 'default' }: KpiCardProps) {
  const styles = variantStyles[variant]

  return (
    <Card className={cn('border-2 transition-shadow hover:shadow-md', styles.card)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn('rounded-md p-2', styles.iconWrapper)}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">
          {typeof value === 'number' ? value.toLocaleString('es-EC') : value}
        </div>
        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}