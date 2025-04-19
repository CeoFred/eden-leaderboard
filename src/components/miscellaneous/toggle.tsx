'use client'

import type React from 'react'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '~/provider/theme-provider'
import { Button } from 'ui/button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme({ x: e.clientX, y: e.clientY })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  )
}
