import React from 'react'
import Image from 'next/image'
import LeaderBoard from '~/sections/leaderboard'

const Page = () => {
  return (
    <>
      <section className="relative overflow-hidden">
        <Image
          src="/noise_effect.webp"
          alt="noise effect"
          fill
          priority
          className="pointer-events-none fixed inset-0 z-50 h-dvh w-screen md:opacity-90"
        />
        <LeaderBoard />
      </section>
    </>
  )
}

export default Page
