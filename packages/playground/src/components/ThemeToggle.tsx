import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from './ui/button'
import type { Theme } from '../hooks/useTheme'

const next: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
}

const icons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

interface ThemeToggleProps {
  theme: Theme
  onToggle: (theme: Theme) => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const Icon = icons[theme]
  return (
    <Button
      variant="outline"
      size="icon-xs"
      className="cursor-pointer shadow-sm"
      onClick={() => onToggle(next[theme])}
      aria-label={`Theme: ${theme}`}
      title={`Theme: ${theme}`}
    >
      <Icon className="size-3.5" />
    </Button>
  )
}
