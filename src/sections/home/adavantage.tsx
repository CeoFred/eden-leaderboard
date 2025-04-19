'use client'
import React, { useRef } from 'react'
import AdavantageCard from '~/components/cards/adavantage-card'
import AdavantageCardLarge from '~/components/cards/adavantage-card-large'
import useInView from '~/hooks/use-in-view'

const Adavantages = () => {
  const overviewRef = useRef<HTMLDivElement>(null)
  const overviewInView = useInView({
    ref: overviewRef,
    once: true,
  })

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-[linear-gradient(169deg,_#E4DDF1_10.48%,_#F5F5F7_25.81%)] py-10 sm:py-20 dark:bg-[linear-gradient(169deg,_#32234F_10.48%,_#09090B_25.81%)]">
      <div ref={overviewRef} className="mb-12 text-center">
        <h2
          style={{
            transform: overviewInView ? 'none' : 'translateY(100px)',
            opacity: overviewInView ? 1 : 0,
            transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
          }}
          className="mb-4 text-4xl font-bold"
        >
          The Eden Advantage
        </h2>
        <p
          style={{
            transform: overviewInView ? 'none' : 'translateY(100px)',
            opacity: overviewInView ? 1 : 0,
            transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s',
          }}
          className="text-muted-foreground mx-auto max-w-3xl"
        >
          Eden Finance offers significant advantages over traditional DeFi
          protocols, combining AI-enhanced security with cross-chain
          optimization. ecosystem.
        </p>
      </div>
      <div
        style={{
          transform: overviewInView ? 'none' : 'translateY(100px)',
          opacity: overviewInView ? 1 : 0,
          transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s',
        }}
        className="flex w-full flex-col items-center justify-center gap-4 xl:gap-6"
      >
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 max-md:px-4 max-sm:gap-y-8 sm:flex-row xl:gap-6">
          <AdavantageCard
            image="/borrow.png"
            title="Borrow Assets"
            description="Borrowing made easy, connect your wallet, deposit your preferred collateral, and instantly borrow an asset"
            width={500}
            height={400}
          />
          <AdavantageCard
            image="/lending.png"
            title="Lending & Yeild"
            description="Connect your wallet, deposit your asset into lending pools, and start earning APY rewards from borrowers"
            width={544}
            height={401}
          />
        </div>
        <div className="mx-auto flex w-full items-center justify-center max-md:px-4">
          <AdavantageCardLarge
            image="/ausd.png"
            title="aUSD Minting"
            description="Deposit your assets as collateral to mint aUSD, Earn AI-driven yield, track performance, and redeem anytime."
            width={960}
            height={484}
            className="w-full lg:h-[536px] lg:w-[1280px]"
          />
        </div>
      </div>
    </div>
  )
}

export default Adavantages

// An open-sourced, lite version of Simoles that provides wallet to wallet messaging and customers support by linking it in your HTML.
