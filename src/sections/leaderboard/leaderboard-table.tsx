'use client'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '~/lib/utils'

type TimeFilter = 'day' | 'week' | 'month' | 'all'

interface LeaderboardUser {
  address: string
  points: number
  total_supplied: number
  total_borrowed: number
}

interface LeaderboardTableProps {
  data: LeaderboardUser[]
  page: number
  setPage: (page: number) => void
  totalPages: number
  totalItems: number
  timeFilter: TimeFilter
  isLoading?: boolean
}

export const LeaderboardTable = ({
  data,
  page,
  setPage,
  totalPages,
  totalItems,
  isLoading = false,
}: LeaderboardTableProps) => {
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`
    }
    return num.toFixed(2)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-gray-800 bg-gray-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Supplied</TableHead>
              <TableHead className="text-right">Borrowed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-6 w-10" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-6 w-24" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-6 w-24" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-6 w-24" />
                  </TableCell>
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((user, index) => {
                const rank = (page - 1) * 10 + index + 1

                return (
                  <TableRow key={user.address}>
                    <TableCell className="font-medium">
                      <span
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full',
                          rank === 1 && 'bg-amber-500/20 text-amber-500',
                          rank === 2 && 'bg-slate-400/20 text-slate-400',
                          rank === 3 && 'bg-amber-800/20 text-amber-800'
                        )}
                      >
                        {rank}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gray-800">
                            {user.address.slice(2, 4)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="font-medium">
                            {truncateAddress(user.address)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(user.points)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${formatNumber(user.total_supplied)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${formatNumber(user.total_borrowed)}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {data.length > 0 ? (page - 1) * 10 + 1 : 0} to{' '}
          {Math.min(page * 10, totalItems)} of {totalItems} results
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-800 bg-gray-950 text-gray-400 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-800 bg-gray-950 text-gray-400 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
