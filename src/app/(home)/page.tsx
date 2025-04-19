import React from 'react'
import Image from 'next/image'
import Adavantages from '~/sections/home/adavantage'
import HeroSection from '~/sections/home/hero-section'
import DefiEcosystem from '~/sections/home/defi-ecosystem'
import AlternativeStatsSection from '~/sections/home/stats-section'
import EdenFinanceComparison from '~/sections/home/eden-finance-comparison'
import FAQSection from '~/sections/home/faq-section'
import CTASection from '~/sections/home/cta-section'

const Page = () => {
  return (
    <>
      <HeroSection />
      <section className="relative overflow-hidden">
        <Image
          src="/noise_effect.webp"
          alt="noise effect"
          fill
          priority
          className="pointer-events-none fixed inset-0 z-50 h-dvh w-screen md:opacity-90"
        />
        <AlternativeStatsSection />
        <DefiEcosystem />
      </section>
      <section className="relative">
        <Image
          src="/noise_effect.webp"
          alt="noise effect"
          fill
          priority
          className="pointer-events-none fixed inset-0 z-50 h-dvh w-screen md:opacity-90"
        />
        <Adavantages />
      </section>
      <section className="relative">
        <EdenFinanceComparison />
      </section>
      <section className="relative">
        <Image
          src="/noise_effect.webp"
          alt="noise effect"
          fill
          priority
          className="pointer-events-none fixed inset-0 z-50 h-dvh w-screen md:opacity-90"
        />
        <FAQSection />
      </section>
      <CTASection />
      {/* <ThemeToggle /> */}
    </>
  )
}

export default Page
