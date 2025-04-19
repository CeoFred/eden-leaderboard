// 'use client'
import React from 'react'
import { FeatureCardProps } from '~/types/global'

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e

    const rect = target?.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    target.style.setProperty('--border--x', `${x}px`)
    target.style.setProperty('--border--y', `${y}px`)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="card relative flex h-[261px] w-full max-w-[454px] items-center justify-center rounded-xl border border-gray-300 p-[2px] pb-1 transition-all sm:rounded-2xl dark:border-none dark:p-[3px]"
    >
      <div className="card-border" />
      <div className="card-content flex h-full w-full flex-col items-start justify-center gap-y-4 bg-white p-1 pl-2 max-[1140px]:p-4 min-[1310px]:p-4 dark:bg-gray-950 max-[360px]:[&>p]:text-[12px]">
        <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-card-foreground/80">{description}</p>
      </div>
    </div>
  )
}

export default FeatureCard
