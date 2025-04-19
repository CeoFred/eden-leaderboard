'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '~/lib/utils'
import { ORBITAL_ELEMENTS } from '~/constants'
import WhiteLogoIcon from '~/components/icons/logo-white'

export default function OrbitalAnimation() {
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.1) % 360)
    }, 16)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [isClient])

  const orbitRadius = Math.min(containerSize.width, containerSize.height) * 0.35
  const centerX = containerSize.width / 2
  const centerY = containerSize.height / 2

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-[400px] w-full lg:min-h-[600px] lg:translate-x-10 lg:scale-150"
    >
      {isClient && (
        <>
          <motion.div
            className="absolute z-10 flex items-center justify-center rounded-full bg-[#9669ED]/80 p-1.5 shadow-[0_0_45px_#9669ED]"
            style={{
              width: 70,
              height: 70,
              left: centerX - 35,
              top: centerY - 35,
            }}
          >
            <div className="flex size-full items-center justify-center rounded-full bg-[#9669ED] shadow-[0_0_45px_#9669ED]">
              {/* <span className="text-2xl text-white">🌱</span> */}
              <WhiteLogoIcon />
            </div>
          </motion.div>

          <svg
            className="absolute top-0 left-0 h-full w-full"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient
                id="orbitalStrokeGradient"
                gradientUnits="userSpaceOnUse"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="25%" stopColor="#d29ef1" />
                <stop offset="50%" stopColor="#32234F" />
                <stop offset="75%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#32234F" />
              </linearGradient>
            </defs>
            <circle
              cx={centerX}
              cy={centerY}
              r={orbitRadius}
              fill="none"
              stroke="url(#orbitalStrokeGradient)"
              strokeWidth="1"
            />
          </svg>

          {ORBITAL_ELEMENTS.map((element) => {
            const angle = ((element.initialAngle + rotation) * Math.PI) / 180
            const x = centerX + orbitRadius * Math.cos(angle)
            const y = centerY + orbitRadius * Math.sin(angle)

            return (
              <div key={element.id}>
                {/* Thread or line connecting the icons to the icon for center */}
                <svg
                  className="absolute top-0 left-0 h-full w-full"
                  style={{ zIndex: 2 }}
                >
                  <defs>
                    <linearGradient
                      id={`gradient-${element.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#32234F" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor={'#8B5CF6'}
                        stopOpacity="0.8"
                      />
                    </linearGradient>
                  </defs>
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke={`url(#gradient-${element.id})`}
                    strokeWidth="1"
                  />
                </svg>

                <div
                  className="absolute flex items-center justify-center rounded-full p-1.5 font-bold text-white"
                  style={{
                    width: 60,
                    height: 60,
                    left: x - 30,
                    top: y - 30,
                    backgroundColor: element.backgroundColor,
                    boxShadow: `0 0 45px ${element.color}`,
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: element.backgroundColor,
                    }}
                    className={cn(
                      'flex size-full items-center justify-center rounded-full border border-white/10'
                    )}
                  >
                    <element.icon />
                  </div>
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
