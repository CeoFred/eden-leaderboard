'use client'

import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'
import LogoIcon from '../icons/logo'

export default function Footer() {
  return (
    <footer className="relative min-h-[478px] overflow-hidden bg-[#2D1E4F] px-6 py-12 text-white md:px-12 lg:p-[80px]">
      <div
        style={{
          color: 'var(--Primary-100, #F5F0FE)',
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(128px, 15vw, 200px)',
          fontWeight: 600,
          lineHeight: '100%',
          letterSpacing: 'clamp(-3.84px, -0.5vw, -6px)',
        }}
        className="pointer-events-none absolute -bottom-10 overflow-hidden text-[80px] font-bold whitespace-nowrap text-[#3A2A5E] opacity-30 select-none sm:text-[120px] md:-bottom-17 md:text-[160px] lg:-bottom-16"
      >
        Eden Finance
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Logo and tagline section */}
          <div className="space-y-4 md:max-w-md">
            <div className="flex items-center gap-2">
              <LogoIcon />
              {/* TODO: Add a heading here if needed with proper context */}
            </div>

            <p className="text-sm text-gray-300 md:text-base">
              Redefining DeFi with AI-powered intelligence, yield-bearing
              stablecoins, and cross-chain integrations.
            </p>

            {/* Social icons - mobile and desktop */}
            <div className="flex items-center gap-4 pt-2">
              
              <Link
                href="https://github.com/edenfinance"
                className="text-gray-300 transition-colors hover:text-white"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              
              <Link
                href="https://x.com/0xedenfi"
                className="text-gray-300 transition-colors hover:text-white"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="text-sm text-gray-300 md:self-start md:text-right">
            © 2025 Eden Finance. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
