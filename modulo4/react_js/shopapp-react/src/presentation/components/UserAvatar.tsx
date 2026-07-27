// src/presentation/components/UserAvatar.tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/presentation/components/ui/avatar'
import { cn } from '@/presentation/utils/cn'
import type { UserProfile } from '@/domain/entities/user-profile.entity'

interface UserAvatarProps {
  user: UserProfile | null
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses: Record<NonNullable<UserAvatarProps['size']>, string> = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-10 w-10 text-sm',
  lg: 'h-20 w-20 text-2xl',
}

function getInitials(user: UserProfile): string {
  const first = user.first_name?.trim()
  const last = user.last_name?.trim()

  if (first && last) return `${first[0]}${last[0]}`.toUpperCase()
  if (first) return first[0].toUpperCase()
  return user.username.slice(0, 2).toUpperCase()
}

export function UserAvatar({ user, size = 'md' }: UserAvatarProps) {
  return (
    <Avatar className={cn(sizeClasses[size])}>
      {user?.avatar_url && <AvatarImage src={user.avatar_url} alt={`Avatar de ${user.username}`} />}
      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
        {user ? getInitials(user) : '?'}
      </AvatarFallback>
    </Avatar>
  )
}