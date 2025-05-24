'use client'

import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '~/lib/utils'

// Better type definition with more specific constraints
interface TabOption {
  readonly value: string
  readonly label: string
  readonly disabled?: boolean
}

interface CustomTabsProps {
  options: readonly TabOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
  'data-testid'?: string
  ariaLabel?: string
}

// Animation configuration constants
const ANIMATION_CONFIG = {
  type: 'spring' as const,
  duration: 0.5,
  bounce: 0.2,
} as const

// Individual tab button component for better separation
interface TabButtonProps {
  option: TabOption
  isSelected: boolean
  isDisabled: boolean
  onClick: () => void
}

const TabButton: React.FC<TabButtonProps> = ({
  option,
  isSelected,
  isDisabled,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isDisabled || option.disabled}
    className={cn(
      'relative z-10 rounded-md px-4 py-1.5 text-sm font-medium transition-colors duration-200',
      'focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50',
      isSelected
        ? 'text-white'
        : 'text-gray-400 hover:text-gray-300 disabled:hover:text-gray-400'
    )}
    aria-pressed={isSelected}
    aria-describedby={isSelected ? `${option.value}-selected` : undefined}
  >
    {option.label}

    {isSelected && (
      <motion.div
        layoutId="tab-indicator"
        className="absolute inset-0 rounded-md bg-gray-800"
        style={{ zIndex: -1 }}
        transition={ANIMATION_CONFIG}
        initial={false}
        aria-hidden="true"
      />
    )}

    {isSelected && (
      <span id={`${option.value}-selected`} className="sr-only">
        Currently selected
      </span>
    )}
  </button>
)

export function CustomTabs({
  options,
  value,
  onChange,
  className,
  disabled = false,
  'data-testid': dataTestId,
  ariaLabel = 'Tab navigation',
}: CustomTabsProps) {
  const handleChange = useCallback(
    (optionValue: string) => {
      if (!disabled && optionValue !== value) {
        onChange(optionValue)
      }
    },
    [disabled, value, onChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return

      const currentIndex = options.findIndex((option) => option.value === value)
      let nextIndex = currentIndex

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
          break
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
          break
        case 'Home':
          e.preventDefault()
          nextIndex = 0
          break
        case 'End':
          e.preventDefault()
          nextIndex = options.length - 1
          break
        default:
          return
      }

      const nextOption = options[nextIndex]
      if (nextOption && !nextOption.disabled) {
        handleChange(nextOption.value)
      }
    },
    [disabled, options, value, handleChange]
  )

  return (
    <div
      className={cn(
        'relative flex rounded-md bg-gray-900 p-1',
        'focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-950',
        className
      )}
      role="tablist"
      aria-label={ariaLabel}
      data-testid={dataTestId}
      onKeyDown={handleKeyDown}
    >
      {options.map((option) => {
        const isSelected = option.value === value

        return (
          <TabButton
            key={option.value}
            option={option}
            isSelected={isSelected}
            isDisabled={disabled}
            onClick={() => handleChange(option.value)}
          />
        )
      })}
    </div>
  )
}
