'use client'

import React, {
  useEffect,
  useState,
  useTransition,
  useCallback,
  useMemo,
} from 'react'
import { Search } from 'lucide-react'
import ConnectButton from '~/components/miscellaneous/connect-button'
import { CustomTabs } from '~/components/miscellaneous/custom-tabs'
import { Input } from '~/components/ui/input'
import { StatsCard } from '~/components/cards/stat-card'
import { LeaderboardTable } from './leaderboard-table'

export type TimeFilter = 'today' | 'week' | 'month' | 'year' | 'all'

export interface ApiUserData {
  readonly address: string
  readonly points: number
  readonly total_supplied: number
  readonly total_borrowed: number
}

export interface LeaderboardResponse {
  readonly data: ApiUserData[]
  readonly pagination: {
    readonly page: number
    readonly limit: number
    readonly total: number
    readonly prev_page: number
    readonly next_page: number
    readonly total_pages: number
  }
}

export interface StatisticsResponse {
  readonly period: string
  readonly total_users: number
  readonly total_supplied: number
  readonly total_borrowed: number
  readonly total_assets: number
}

const API_BASE_URL = 'https://testnet-api.eden-finance.xyz/api/v1'
const ITEMS_PER_PAGE = 10 as const
const DEBOUNCE_DELAY = 300 as const

const TAB_OPTIONS = [
  { value: 'today' as const, label: 'Today' },
  { value: 'week' as const, label: 'This Week' },
  { value: 'month' as const, label: 'This Month' },
  { value: 'year' as const, label: 'This Year' },
  { value: 'all' as const, label: 'All Time' },
] as const

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

class LeaderboardAPI {
  private static async fetchWithErrorHandling<T>(
    url: string
  ): Promise<T | null> {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      return null
    }
  }

  static async getLeaderboardData(
    page: number,
    period: TimeFilter
  ): Promise<LeaderboardResponse | null> {
    const url = `${API_BASE_URL}/leaderboard/?page=${page}&limit=${ITEMS_PER_PAGE}&period=${period}`
    return this.fetchWithErrorHandling<LeaderboardResponse>(url)
  }

  static async getStatistics(
    period: TimeFilter
  ): Promise<StatisticsResponse | null> {
    const url = `${API_BASE_URL}/leaderboard/statistics?period=${period}`
    return this.fetchWithErrorHandling<StatisticsResponse>(url)
  }
}

const formatStatValue = (
  value: number | undefined,
  type: 'currency' | 'number'
): string => {
  if (value === undefined) return '0'

  switch (type) {
    case 'currency':
      return `$${value.toFixed(1)}`
    case 'number':
      return value.toLocaleString()
    default:
      return value.toString()
  }
}

const LeaderBoard = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState<ApiUserData[]>([])
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null)
  const [pagination, setPagination] = useState<
    LeaderboardResponse['pagination'] | null
  >(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY)

  const filteredData = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return data

    const query = debouncedSearchQuery.toLowerCase()
    return data.filter((user) => user.address.toLowerCase().includes(query))
  }, [data, debouncedSearchQuery])

  const fetchLeaderboardData = useCallback(
    async (currentPage: number, period: TimeFilter) => {
      setLoading(true)
      setError(null)

      try {
        const result = await LeaderboardAPI.getLeaderboardData(
          currentPage,
          period
        )
        if (result) {
          setData(result.data)
          setPagination(result.pagination)
        } else {
          setError('Failed to load leaderboard data')
        }
      } catch (err) {
        setError('An unexpected error occurred')
        console.error('Leaderboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const fetchStatistics = useCallback(async (period: TimeFilter) => {
    try {
      const result = await LeaderboardAPI.getStatistics(period)

      if (result) {
        setStatistics(result)
      } else {
        console.warn('Failed to load statistics')
      }
    } catch (err) {
      console.error('Statistics fetch error:', err)
    }
  }, [])

  const handleTimeFilterChange = useCallback(
    (value: string) => {
      if (!isPending) {
        setTimeFilter(value as TimeFilter)
        setPage(1)
      }
    },
    [isPending]
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
      setPage(1)
    },
    []
  )

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  useEffect(() => {
    fetchLeaderboardData(1, timeFilter)
    fetchStatistics(timeFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    startTransition(async () => {
      await fetchStatistics(timeFilter)
      fetchLeaderboardData(1, timeFilter)
    })
  }, [timeFilter, fetchStatistics, fetchLeaderboardData])

  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      fetchLeaderboardData(page, timeFilter)
    }
  }, [page, fetchLeaderboardData, debouncedSearchQuery, timeFilter])

  const tableData = debouncedSearchQuery.trim() ? filteredData : data
  const totalItems = debouncedSearchQuery.trim()
    ? filteredData.length
    : pagination?.total || 0
  const totalPages = debouncedSearchQuery.trim()
    ? Math.ceil(filteredData.length / ITEMS_PER_PAGE)
    : pagination?.total_pages || 1

  return (
    <div className="@container mx-auto flex w-full flex-col gap-8 px-4 py-16 dark:bg-black">
      <header className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <p className="text-gray-400">
            Track the top performers in the Eden Finance ecosystem and see how
            you compare.
          </p>
        </div>
        <ConnectButton />
      </header>

      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950/50 p-4 text-red-400">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-4">
        <CustomTabs
          options={TAB_OPTIONS}
          value={timeFilter}
          onChange={handleTimeFilterChange}
          disabled={isPending}
          ariaLabel="Time filter tabs"
        />

        <div className="relative">
          <Search
            className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
          <Input
            placeholder="Search by address..."
            className="w-[300px] border-gray-800 pl-8 text-sm dark:bg-gray-900"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search addresses"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={formatStatValue(statistics?.total_users, 'number')}
          // change={STAT_CHANGES.users}
          icon="users"
          loading={isPending}
          data-testid="stats-users"
        />
        <StatsCard
          title="Total Supplied"
          value={formatStatValue(statistics?.total_supplied, 'currency')}
          // change={STAT_CHANGES.supplied}
          icon="trending-up"
          loading={isPending}
          data-testid="stats-supplied"
        />
        <StatsCard
          title="Total Borrowed"
          value={formatStatValue(statistics?.total_borrowed, 'currency')}
          // change={STAT_CHANGES.borrowed}
          icon="trending-down"
          loading={isPending}
          data-testid="stats-borrowed"
        />
        <StatsCard
          title="Reserves"
          value={statistics?.total_assets?.toString() || '0'}
          icon="database"
          loading={isPending}
          data-testid="stats-assets"
        />
      </div>

      {/* Leaderboard Table */}
      <LeaderboardTable
        data={tableData}
        page={page}
        setPage={handlePageChange}
        totalPages={totalPages}
        totalItems={totalItems}
        timeFilter={timeFilter}
        loading={loading || isPending}
        isSearching={Boolean(debouncedSearchQuery.trim())}
        error={error}
      />
    </div>
  )
}

export default LeaderBoard
