'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import BlurImage from '../miscellaneous/blur-image'

export default function AdavantageCardLarge({
  image,
  title,
  description,
  width,
  height,
}: {
  image: string
  title: string
  description: string
  width: number
  height: number
  className?: string
}) {
  const [transformStyle, setTransformStyle] = useState('')
  const itemRef = useRef<HTMLDivElement | null>(null)

  const INTENSITY_X = 10
  const INTENSITY_Y = -10

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    if (!itemRef.current) return
    const { left, top, width, height } = itemRef.current.getBoundingClientRect()

    const relativeX = (e.clientX - left) / width
    const relativeY = (e.clientY - top) / height

    const tiltX = (relativeY - 0.5) * INTENSITY_X
    const tiltY = (relativeX - 0.5) * INTENSITY_Y

    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    setTransformStyle('')
  }

  const patternStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='2' fill='rgba(150, 105, 237, 0.1)' /%3E%3C/svg%3E")`,
    backgroundSize: '100px 100px',
    backgroundRepeat: 'repeat',
    backgroundColor: '#1E152F',
  }

  return (
    <div
      className="relative flex max-w-[1280px] flex-col items-start gap-8 overflow-hidden rounded-[32px] border-[rgba(150,105,237,0.1)] p-4 pb-0 sm:h-[536px] sm:min-w-[1280px] sm:flex-row sm:p-8 dark:border"
      style={{ ...patternStyle, transform: transformStyle }}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-[531px] items-start">
        <motion.button
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-purple-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {title}
        </motion.button>
        <motion.h2
          className="mt-[16px] mb-4 text-2xl font-semibold text-purple-300 sm:text-[28px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {description}
        </motion.h2>
      </div>

      <BlurImage
        src={image}
        alt={title}
        width={width}
        height={height}
        className="right-0 bottom-0 sm:absolute"
      />
    </div>
  )
}
