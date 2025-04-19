'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import LogoIcon from '~/components/icons/logo'
import BlurImage from '~/components/miscellaneous/blur-image'

export default function CTASection() {
  return (
    <div className="relative w-full overflow-hidden px-4 py-24">
      <div className="absolute inset-0 z-0">
        <BlurImage
          src="/cta.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-purple-600/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Logo */}
        <motion.div
          className="mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoIcon />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ready to Experience the Future of DeFi?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="mb-10 text-lg text-white/90 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join Eden Finance today and unlock the power of AI-enhanced yield
          generation, secure lending, and cross-chain optimization.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="#"
            className="rounded-lg bg-white px-8 py-3 font-medium text-purple-600 shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
          >
            Launch App
          </Link>
          <Link
            href="#"
            className="rounded-lg border border-white px-8 py-3 font-medium text-white transition-transform hover:scale-105 hover:bg-white/10"
          >
            Read Documentation
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
