'use client'

import React, { useState, useCallback, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import {
  ChevronRight,
  ChevronLeft,
  Trophy,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Award,
  Medal,
} from 'lucide-react'
import type { ApiUserData, TimeFilter } from '.'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { formatCurrency, formatNumber } from '~/lib/utils'
import { cn } from '~/lib/utils'

const ITEMS_PER_PAGE = 10 as const
const COPY_TIMEOUT = 2000 as const
const EXPLORER_BASE_URL = 'https://etherscan.io/address/' as const

interface LeaderboardTableProps {
  data: ApiUserData[]
  page: number
  setPage: (page: number) => void
  totalPages: number
  totalItems: number
  timeFilter: TimeFilter
  loading?: boolean
  isSearching?: boolean
  error?: string | null
  className?: string
}

interface RankDisplayProps {
  rank: number
  className?: string
}

interface UserCellProps {
  user: ApiUserData
  className?: string
}

interface ActionButtonsProps {
  address: string
  copiedAddress: string | null
  onCopyAddress: (address: string) => void
  onOpenExplorer: (address: string) => void
}

const getTrophyColor = (rank: number): string => {
  switch (rank) {
    case 1:
      return 'text-yellow-500'
    case 2:
      return 'text-gray-300'
    case 3:
      return 'text-amber-700'
    default:
      return 'text-gray-400'
  }
}

const formatAddress = (address: string): string => {
  if (address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const getAvatarText = (address: string): string => {
  if (address.length < 4) return address.slice(0, 2).toUpperCase()
  return address.startsWith('0x')
    ? address.slice(2, 4).toUpperCase()
    : address.slice(0, 2).toUpperCase()
}

const isValidEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

const RankDisplay = ({ rank, className }: RankDisplayProps) => {
  if (rank <= 3) {
    return (
      <div className={cn('flex justify-center', className)}>
        <Trophy
          className={cn('h-5 w-5', getTrophyColor(rank))}
          aria-label={`Rank ${rank}`}
        />
      </div>
    )
  }

  return (
    <div className={cn('text-center', className)} aria-label={`Rank ${rank}`}>
      #{rank}
    </div>
  )
}

const UserCell = ({ user, className }: UserCellProps) => {
  const avatarText = useMemo(() => getAvatarText(user.address), [user.address])
  const formattedAddress = useMemo(
    () => formatAddress(user.address),
    [user.address]
  )

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Avatar className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
        <AvatarFallback className="text-xs font-medium text-white">
          {avatarText}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium" title={formattedAddress}>
          {formattedAddress}
        </div>
        <div className="truncate text-xs text-gray-400" title={user.address}>
          {user.address}
        </div>
      </div>
    </div>
  )
}

const ActionButtons = ({
  address,
  copiedAddress,
  onCopyAddress,
  onOpenExplorer,
}: ActionButtonsProps) => {
  const isCopied = copiedAddress === address
  const isValidAddress = isValidEthereumAddress(address)

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onCopyAddress(address)}
        aria-label={isCopied ? 'Address copied' : 'Copy address'}
        title={isCopied ? 'Address copied!' : 'Copy address'}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onOpenExplorer(address)}
        disabled={!isValidAddress}
        aria-label="View on block explorer"
        title={
          isValidAddress ? 'View on block explorer' : 'Invalid address format'
        }
      >
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  )
}

const LoadingState = () => {
  const skeletonRows = Array.from({ length: 10 }, (_, i) => i)

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-12 gap-4 border-b border-gray-800 px-6 py-4 text-sm font-medium text-gray-300 dark:bg-gray-800/50">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">User</div>
          <div className="col-span-2 text-right">Total Borrowed</div>
          <div className="col-span-2 text-right">Total Supplied</div>
          <div className="col-span-2 text-right">Points</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y divide-gray-800">
          {skeletonRows.map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-12 items-center gap-4 px-6 py-4"
            >
              <div className="col-span-1 flex items-center space-x-2">
                <div className="animate-pulse">
                  {index === 0 && (
                    <Trophy className="h-5 w-5 text-yellow-500/30" />
                  )}
                  {index === 1 && (
                    <Medal className="h-5 w-5 text-gray-400/30" />
                  )}
                  {index === 2 && (
                    <Award className="h-5 w-5 text-orange-500/30" />
                  )}
                  {index > 2 && (
                    <div className="h-5 w-5 animate-pulse rounded bg-gray-700" />
                  )}
                </div>
              </div>

              <div className="col-span-4 flex items-center space-x-3">
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-700" />
                <div className="space-y-1">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-700" />
                  <div className="h-3 w-32 animate-pulse rounded bg-gray-800" />
                </div>
              </div>

              <div className="col-span-2 text-right">
                <div className="ml-auto h-4 w-16 animate-pulse rounded bg-gray-700" />
              </div>

              <div className="col-span-2 text-right">
                <div className="ml-auto h-4 w-20 animate-pulse rounded bg-gray-700" />
              </div>

              <div className="col-span-2 text-right">
                <div className="ml-auto h-4 w-16 animate-pulse rounded bg-gray-700" />
              </div>

              <div className="col-span-1 flex justify-end space-x-2">
                <div className="h-6 w-6 animate-pulse rounded bg-gray-700" />
                <div className="h-6 w-6 animate-pulse rounded bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ErrorState = ({ error }: { error: string }) => (
  <div className="space-y-4">
    <div className="overflow-hidden rounded-lg border border-red-800 bg-red-950/50">
      <div className="p-8 text-center text-red-400">
        <AlertCircle className="mx-auto mb-2 h-8 w-8" />
        <p className="font-medium">Failed to load data</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    </div>
  </div>
)

const EmptyState = ({ isSearching }: { isSearching: boolean }) => (
  <TableRow>
    <TableCell colSpan={6} className="py-8 text-center text-gray-400">
      {isSearching ? 'No matching addresses found' : 'No users found'}
    </TableCell>
  </TableRow>
)

export function LeaderboardTable({
  data,
  page,
  setPage,
  totalPages,
  totalItems,
  loading = false,
  isSearching = false,
  error = null,
  className,
}: LeaderboardTableProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const { startItem, endItem } = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE + 1
    const end = Math.min(page * ITEMS_PER_PAGE, totalItems)
    return { startItem: start, endItem: end }
  }, [page, totalItems])

  const handlePrevPage = useCallback(() => {
    if (page > 1 && !loading) {
      setPage(page - 1)
    }
  }, [page, loading, setPage])

  const handleNextPage = useCallback(() => {
    if (page < totalPages && !loading) {
      setPage(page + 1)
    }
  }, [page, totalPages, loading, setPage])

  const handleCopyAddress = useCallback(async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      setTimeout(() => setCopiedAddress(null), COPY_TIMEOUT)
    } catch (err) {
      console.error('Failed to copy address:', err)
    }
  }, [])

  const handleOpenExplorer = useCallback((address: string) => {
    if (!isValidEthereumAddress(address)) {
      console.warn('Invalid Ethereum address format:', address)
      return
    }

    const explorerUrl = `${EXPLORER_BASE_URL}${address}`
    window.open(explorerUrl, '_blank', 'noopener,noreferrer')
  }, [])

  const getRankDisplay = useCallback(
    (index: number) => {
      return startItem + index
    },
    [startItem]
  )

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="overflow-hidden rounded-lg border border-gray-800">
        <Table>
          <TableHeader className="dark:bg-gray-900">
            <TableRow>
              <TableHead className="w-[80px] text-center">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Total Borrowed</TableHead>
              <TableHead className="text-right">Total Supplied</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="w-[100px]" aria-label="Actions"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <EmptyState isSearching={isSearching} />
            ) : (
              data.map((user, index) => {
                const rank = getRankDisplay(index)

                return (
                  <TableRow
                    key={`${user.address}-${page}`}
                    className="border-t border-gray-800 transition-colors hover:bg-gray-900/50"
                  >
                    <TableCell className="py-3">
                      <RankDisplay rank={rank} />
                    </TableCell>
                    <TableCell>
                      <UserCell user={user} />
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(user.total_borrowed)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(user.total_supplied)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatNumber(user.points)} pts
                    </TableCell>
                    <TableCell>
                      <ActionButtons
                        address={user.address}
                        copiedAddress={copiedAddress}
                        onCopyAddress={handleCopyAddress}
                        onOpenExplorer={handleOpenExplorer}
                      />
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {data.length > 0 ? startItem : 0} to {endItem} of {totalItems}{' '}
          users
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevPage}
            disabled={page === 1 || loading}
            className="h-8 w-8 border-gray-800"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center px-3 text-sm text-gray-400">
            {page} of {totalPages}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={page >= totalPages || loading}
            className="h-8 w-8 border-gray-800"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
