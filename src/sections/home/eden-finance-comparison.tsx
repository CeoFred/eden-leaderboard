'use client'

import { Check, X } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'ui/table'
import LogoIcon from '../../components/icons/logo'

export default function EdenFinanceComparison() {
  const features = [
    {
      name: 'AI-Enhanced Risk Management',
      edenFinance: true,
      traditional: false,
    },
    {
      name: 'Cross-Chain Yield Optimization',
      edenFinance: true,
      traditional: false,
    },
    {
      name: 'Low-Cost Transactions',
      edenFinance: true,
      traditional: false,
    },
    {
      name: 'Real-World Asset Integration',
      edenFinance: true,
      traditional: false,
    },
    {
      name: 'Fintech & Developer API',
      edenFinance: true,
      traditional: false,
    },
    {
      name: 'Stablecoin Yield Farming',
      edenFinance: true,
      traditional: 'Sometimes',
    },
  ]

  return (
    <div className="flex items-center justify-center px-4 py-12 sm:px-6 md:px-8 dark:bg-[#09090B]">
      <div className="w-full max-w-full lg:max-w-[1280px]">
        <div className="w-full px-4 py-8 text-center sm:px-6 sm:py-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
            How We Compare
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">
            Eden Finance offers significant advantages over traditional DeFi
            protocols, combining AI-enhanced security with cross-chain
            optimization.
          </p>
        </div>

        <div className="relative w-full overflow-x-auto">
          <div className="relative mx-auto max-w-full overflow-hidden rounded-2xl lg:max-w-[1280px]">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-purple-800/30 to-purple-500/30 p-[1px] dark:from-purple-700/20 dark:to-blue-900/20" />
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/10">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader className="bg-black">
                    <TableRow className="border-none">
                      <TableHead className="w-1/3 p-3 text-left text-gray-300 sm:p-4 sm:text-center md:p-[24px]">
                        <span className="text-sm sm:text-base">Feature</span>
                      </TableHead>
                      <TableHead className="w-1/3 p-3 text-center text-gray-300 sm:p-4 md:p-[24px]">
                        <div className="flex w-full items-center justify-center gap-1 sm:gap-2">
                          <div className="text-center text-purple-400">
                            <LogoIcon />
                          </div>
                          <h2 className="text-sm font-medium text-purple-400 sm:text-base">
                            Eden finance
                          </h2>
                        </div>
                      </TableHead>
                      <TableHead className="w-1/3 p-3 text-center text-gray-300 sm:p-4 md:p-[24px]">
                        <span className="text-sm sm:text-base">
                          Traditional DeFi
                        </span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {features.map((feature, index) => (
                      <TableRow
                        key={index}
                        className="border-b border-[rgba(150,105,237,0.05)]"
                      >
                        <TableCell className="bg-black p-3 text-left text-sm font-medium text-gray-300 sm:p-4 sm:text-center sm:text-base md:p-[24px]">
                          {feature.name}
                        </TableCell>
                        <TableCell className="bg-[#1E152F] p-3 text-center sm:p-4 md:p-[24px]">
                          {feature.edenFinance && (
                            <Check className="mx-auto h-4 w-4 text-teal-400 sm:h-5 sm:w-5" />
                          )}
                        </TableCell>
                        <TableCell className="bg-black p-3 text-center sm:p-4 md:p-[24px]">
                          {feature.traditional === false ? (
                            <X className="mx-auto h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
                          ) : feature.traditional === 'Sometimes' ? (
                            <span className="text-sm text-gray-300 sm:text-base">
                              Sometimes
                            </span>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
