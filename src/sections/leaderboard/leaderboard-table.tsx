'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'ui/table'
import { Button } from 'ui/button'
import {
  ChevronRight,
  ChevronLeft,
  Trophy,
  ExternalLink,
  Copy,
} from 'lucide-react'
import type { UserData, TimeFilter } from './data'
import { Avatar, AvatarImage, AvatarFallback } from 'ui/avatar'
import { formatCurrency, formatNumber } from '~/lib/utils'

interface LeaderboardTableProps {
  data: UserData[]
  page: number
  setPage: (page: number) => void
  totalPages: number
  totalItems: number
  timeFilter: TimeFilter
}

export function LeaderboardTable({
  data,
  page,
  setPage,
  totalPages,
  totalItems,
  timeFilter,
}: LeaderboardTableProps) {
  const startItem = (page - 1) * 10 + 1
  const endItem = Math.min(page * 10, totalItems)

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const getRankDisplay = (index: number) => {
    const actualRank = startItem + index - 1

    if (actualRank <= 3) {
      return (
        <div className="flex justify-center">
          <Trophy
            className={`h-5 w-5 ${
              actualRank === 1
                ? 'text-yellow-500'
                : actualRank === 2
                  ? 'text-gray-300'
                  : 'text-amber-700'
            }`}
          />
        </div>
      )
    }

    return <div className="text-center">#{actualRank}</div>
  }

  const getPoints = (user: UserData) => {
    switch (timeFilter) {
      case 'day':
        return user.pointsDaily
      case 'week':
        return user.pointsWeekly
      case 'month':
        return user.pointsMonthly
      case 'all':
        return user.pointsAllTime
      default:
        return user.pointsWeekly
    }
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-gray-800">
        <Table>
          <TableHeader className="bg-gray-900">
            <TableRow>
              <TableHead className="w-[80px] text-center">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Total Borrowed</TableHead>
              <TableHead className="text-right">Total Supplies</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user, index) => (
              <TableRow key={user.id} className="border-t border-gray-800">
                <TableCell className="py-3">{getRankDisplay(index)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-400">
                        {user.address}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(user.borrowed)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(user.supplied)}
                </TableCell>
                <TableCell className="text-right">
                  {formatNumber(getPoints(user))} pts
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {startItem} to {endItem} of {totalItems} Users
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevPage}
            disabled={page === 1}
            className="h-8 w-8 border-gray-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="h-8 w-8 border-gray-800"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
