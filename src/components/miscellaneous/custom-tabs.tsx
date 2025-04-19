'use client'
import { motion } from 'framer-motion'
import { cn } from '~/lib/utils'

interface TabOption {
  value: string
  label: string
}

interface CustomTabsProps {
  options: TabOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function CustomTabs({
  options,
  value,
  onChange,
  className,
}: CustomTabsProps) {
  return (
    <div className={cn('relative flex rounded-md bg-gray-900 p-1', className)}>
      {options.map((option) => {
        const isSelected = option.value === value

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              isSelected ? 'text-white' : 'text-gray-400 hover:text-gray-300'
            )}
          >
            {option.label}
            {isSelected && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-md bg-gray-800"
                style={{ zIndex: -1 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                initial={false}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
