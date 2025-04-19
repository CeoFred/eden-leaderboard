'use client'

import * as React from 'react'
import type { ThemeState } from 'types'
import { store_theme } from '~/actions/theme'
import { inDevEnvironment } from '~/lib/utils'
import { useLayoutEffect, useContext, createContext, useState } from 'react'

type Coords = {
  x: number
  y: number
}

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: (coords?: Coords) => void
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

const updateThemeClass = (root: HTMLElement, mode: Theme) => {
  root.classList.remove('light', 'dark')
  if (mode === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    root.classList.add(systemTheme)
  } else {
    root.classList.add(mode)
  }
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: 'system',
  setTheme: () => null,
  toggleTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme as Theme)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!inDevEnvironment) return
    const text = '%c Made with ❤ - Phoenix ',
      style = [
        'font-size: 12px',
        'color: #fffce1',
        'font-family: monospace',
        'font-weight: 500',
        'background: #141717',
        'display: inline-block',
        'padding: 1rem 3rem',
        'border: 1px solid #CF3A46',
        'border-radius: 4px;',
      ].join(';')
    console.log(text, style)
  }, [])

  useLayoutEffect(() => {
    if (!mounted) return
    const root = window.document.documentElement
    updateThemeClass(root, theme)

    store_theme({ theme: theme as ThemeState })
  }, [theme, mounted])

  const handleThemeChange = (newMode: Theme) => {
    setTheme(newMode)
  }

  const handleThemeToggle = (coords?: Coords) => {
    const root = document.documentElement
    const newMode = theme === 'light' ? 'dark' : 'light'
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!document.startViewTransition || prefersReducedMotion) {
      handleThemeChange(newMode)
      return
    }

    if (coords) {
      root.style.setProperty('--x', `${coords.x}px`)
      root.style.setProperty('--y', `${coords.y}px`)
    }

    document.startViewTransition(() => {
      handleThemeChange(newMode)
    })
  }

  const value: ThemeProviderState = {
    theme: theme,
    setTheme: handleThemeChange,
    toggleTheme: handleThemeToggle,
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  // Remove this check since we now provide default values
  // if (context === undefined) {
  //   throw new Error('useTheme must be used within a ThemeProvider')
  // }

  return context
}
