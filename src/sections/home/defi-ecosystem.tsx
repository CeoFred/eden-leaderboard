'use client'
import gsap from 'gsap'
import { useRef } from 'react'
import { features } from '~/constants'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FeatureCard from '~/components/cards/feature-card'

gsap.registerPlugin(ScrollTrigger)
const DefiEcosystem = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const metaRef = useRef<HTMLDivElement | null>(null)
  const mediaRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 769px)', () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'center center',
              scrub: 1,
            },
          })

          tl.fromTo(
            metaRef.current,
            { xPercent: -20, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power2.out',
            }
          )

          tl.fromTo(
            mediaRef.current,
            { xPercent: 20, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power2.out',
            },
            '<0.4'
          )
        })

        mm.add('(max-width: 768px)', () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'center center',
              scrub: 1,
            },
          })

          tl.fromTo(
            metaRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power2.out',
            }
          )

          tl.fromTo(
            mediaRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.2,
              ease: 'power2.out',
            }
          )
        })
      }, sectionRef)

      return () => {
        ctx.revert()
      }
    },
    { scope: sectionRef, dependencies: [] }
  )

  return (
    <div
      ref={sectionRef}
      className="container mx-auto w-full px-4 py-16 dark:bg-black"
    >
      <div ref={metaRef} className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold">AI-Enhanced DeFi Ecosystem</h2>
        <p className="text-muted-foreground mx-auto max-w-3xl">
          Eden Finance combines cutting-edge AI technology with DeFi primitives
          to create a more secure, efficient, and accessible financial
          ecosystem.
        </p>
      </div>

      <div
        ref={mediaRef}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  )
}

export default DefiEcosystem
