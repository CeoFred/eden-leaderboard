'use client'

import type React from 'react'
import {
  Users,
  TrendingUp,
  TrendingDown,
  Database,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '~/lib/utils'

interface StatsCardProps {
  title: string
  value: string
  change?: string
  subtext?: string
  icon: 'users' | 'trending-up' | 'trending-down' | 'database'
  loading?: boolean
}

export function StatsCard({
  title,
  value,
  change,
  subtext,
  icon,
  loading = false,
}: StatsCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e

    const rect = target?.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    target.style.setProperty('--border--x', `${x}px`)
    target.style.setProperty('--border--y', `${y}px`)
  }

  const getIcon = (): LucideIcon => {
    switch (icon) {
      case 'users':
        return Users
      case 'trending-up':
        return TrendingUp
      case 'trending-down':
        return TrendingDown
      case 'database':
        return Database
      default:
        return Users
    }
  }

  const Icon = getIcon()

  return (
    <div
      onMouseMove={handleMouseMove}
      className="admin-card relative flex w-full rounded-xl border border-gray-800 bg-gray-950 select-none max-[410px]:min-w-[70px]"
    >
      <div className="card-border" />
      <div className="card-content flex h-full w-full flex-col justify-between rounded-xl bg-gray-950 p-4">
        <p className="text-xl text-gray-400">{title}</p>
        {loading ? (
          <div className="mt-3 space-y-2">
            <div className="h-12 w-32 animate-pulse rounded bg-gray-800" />
            {change && (
              <div className="h-6 w-24 animate-pulse rounded bg-gray-800" />
            )}
            {subtext && (
              <div className="h-4 w-20 animate-pulse rounded bg-gray-800" />
            )}
          </div>
        ) : (
          <>
            <h3 className="mt-3 text-5xl font-bold text-white">{value}</h3>
            {change && (
              <p className="mt-3 text-lg text-green-500">
                {change} from last week
              </p>
            )}
            {subtext && <p className="mt-1 text-sm text-gray-400">{subtext}</p>}
          </>
        )}
        {/* <div></div> */}
        <div className="absolute top-6 right-6 ml-auto">
          <Icon
            className={cn(
              'h-10 w-10',
              loading ? 'animate-pulse text-gray-600' : 'text-purple-400'
            )}
          />
        </div>
      </div>
    </div>
  )
}
