import 'styles'
import { cn } from '~/lib/utils'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '~/provider/theme-provider'
import { retrive_theme } from '~/actions/theme'
import GoogleAnalytics from '~/components/GoogleAnalytics';

const spaceGrotesk = Space_Grotesk({
  display: "auto",
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Eden Finance Leaderboard - DeFi Rankings on Assetchain',
  description:
    'Track your DeFi performance with Eden Finance Leaderboard on Assetchain. Explore decentralized lending, yield-bearing stablecoins, and AI-driven risk management.',
  keywords: [
    'DeFi leaderboard',
    'Eden Finance',
    'Assetchain DeFi',
    'decentralized lending',
    'yield-bearing stablecoins',
    'AI-driven DeFi',
    'RWA tokenization',
    'Aave fork',
  ],
  openGraph: {
    title: 'Eden Finance Leaderboard - DeFi Rankings on Assetchain',
    description:
      'Track your DeFi performance with Eden Finance Leaderboard on Assetchain. Explore decentralized lending, yield-bearing stablecoins, and AI-driven risk management.',
    url: 'https://leaderboard.edenfinance.org',
    siteName: 'Eden Finance',
    images: [
      {
        url: 'https://leaderboard.edenfinance.org/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eden Finance Leaderboard - DeFi Rankings on Assetchain',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eden Finance Leaderboard - DeFi Rankings on Assetchain',
    description:
      'Track your DeFi performance on Assetchain with Eden Finance Leaderboard! 🌱 Join @rwaassetchain for decentralized lending & AI-driven insights.',
    images: ['https://leaderboard.edenfinance.org/og-image.png'],
    site: '@rwaassetchain',
    creator: '@rwaassetchain',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'Eden Finance Leaderboard',
  'url': 'https://leaderboard.edenfinance.org',
  'description':
    'Track your DeFi performance with Eden Finance Leaderboard on Assetchain. Explore decentralized lending, yield-bearing stablecoins, and AI-driven risk management.',
  'applicationCategory': 'FinanceApplication',
  'operatingSystem': 'Web',
  'creator': {
    '@type': 'Organization',
    'name': 'Eden Finance',
    'url': 'https://leaderboard.edenfinance.org',
    'sameAs': [
      'https://x.com/0xedenfi',
    ],
  },
  'featureList': [
    'Decentralized lending',
    'Yield-bearing stablecoins',
    'AI-driven risk management',
    'Assetchain integration',
    'Referral-based access',
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = await retrive_theme()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <link rel="canonical" href="https://leaderboard.edenfinance.org" />
      </head>
      <body className={cn('scroll-smooth antialiased', spaceGrotesk.variable)}>
        <GoogleAnalytics />
        <ThemeProvider defaultTheme={theme}>
          <main className="bg-background font-space-grotesk relative mx-auto min-h-dvh w-full max-w-[1500px]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}