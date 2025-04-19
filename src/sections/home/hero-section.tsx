import { ArrowRight, Shield, TrendingUp, Zap } from 'lucide-react'
import { Button } from 'ui/button'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const OrbitalAnimation = dynamic(() => import('./orbital-animation'), {
  loading: () => <div className="h-full min-h-[400px] w-full" />,
})

export default function HeroSection() {
  return (
    <section className="text-foreground relative flex min-h-[800px] w-full items-center overflow-hidden bg-gradient-to-b from-[#F7F5FC] from-40% to-[#ECEAFD] px-4 pt-10 lg:px-8 lg:pt-0 dark:bg-gradient-to-b dark:from-[#09090B] dark:from-40% dark:to-[#32234F] dark:text-white">
      <Image
        src="/noise_effect.webp"
        alt="noise effect"
        fill
        priority
        className="pointer-events-none fixed inset-0 z-50 h-dvh w-screen md:opacity-90"
      />
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3">
            <div className="bg-opacity-20 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm">
              <Shield className="h-4 w-4 text-purple-400" />
              <span>AI Enhanced Security</span>
            </div>
            <div className="bg-opacity-20 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              <span>Optimized Yields</span>
            </div>
            <div className="bg-opacity-20 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span>Low-Cost Transactions</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Redefining DeFi with{' '}
              <span className="text-[#9669ED]">AI-Powered</span> Intelligence
            </h1>
            <p className="max-w-lg dark:text-gray-300">
              Eden Finance combines yield-bearing stablecoins, decentralized
              lending, and AI risk management to create a more secure,
              efficient, and accessible DeFi ecosystem.
            </p>
          </div>

          <Button className="h-10 bg-[#26a17aa1] px-6 py-6 text-base text-white hover:bg-purple-700">
            Get Started
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>

        <div className="relative h-full w-full lg:h-[600px]">
          <OrbitalAnimation />
        </div>
      </div>
    </section>
  )
}
