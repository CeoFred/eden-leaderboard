'use client'

import { RefObject, useEffect, useState } from 'react'

interface UseInViewProperties {
  ref: RefObject<HTMLElement | null>
  once?: boolean
  isFrames?: boolean
}

const useInView = ({ ref, once, isFrames }: UseInViewProperties) => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isViewing, setIsViewing] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
          }
          return
        }
        if (entry && entry) {
          setIsViewing(entry.isIntersecting)
          return
        }
      },
      {
        // root: ref?.current,
        // rootMargin: "100px",
        threshold: isFrames ? 0.8 : undefined,
      }
    )

    const currentReference = ref.current
    if (currentReference) {
      observer.observe(currentReference)
      return () => {
        observer.unobserve(currentReference)
      }
    }
  }, [ref, hasAnimated, once, isFrames])

  return once ? hasAnimated : isViewing
}

export default useInView
