'use client'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import ConnectButton from '~/components/miscellaneous/connect-button'
import { CustomTabs } from '~/components/miscellaneous/custom-tabs'
import { Input } from '~/components/ui/input'
import { StatsCard } from '~/components/cards/stat-card'
import { LeaderboardTable } from './leaderboard-table'

type TimeFilter = 'day' | 'week' | 'month' | 'all'

interface LeaderboardUser {
  address: string
  points: number
  total_supplied: number
  total_borrowed: number
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  prev_page: number
  next_page: number
  total_pages: number
}

interface LeaderboardResponse {
  data: LeaderboardUser[]
  pagination: PaginationInfo
}

const LeaderBoard = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<LeaderboardUser[]>([])
  const [filteredData, setFilteredData] = useState<LeaderboardUser[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 10

  const tabOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
  ]

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const url = `https://testnet-api.eden-finance.xyz/api/v1/leaderboard/?page=${page}&limit=${itemsPerPage}`

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`)
        }

        const result: LeaderboardResponse = await response.json()

        setData(result.data)
        setPagination(result.pagination)
      } catch (err) {
        console.error('Error fetching leaderboard data:', err)
        setError('Failed to load leaderboard data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [page])

  useEffect(() => {
    let filtered = [...data]

    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredData(filtered)
  }, [data, searchQuery, timeFilter])

  const totalUsers = pagination?.total || 0
  const totalSupplied = data.reduce((sum, user) => sum + user.total_supplied, 0)
  const totalBorrowed = data.reduce((sum, user) => sum + user.total_borrowed, 0)
  const availableAssets = 4

  const userChange = '+12.5'
  const suppliedChange = '+12.5'
  const borrowedChange = '+12.5'

  return (
    <div className="@container mx-auto flex w-full flex-col gap-8 px-4 py-16 dark:bg-black">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Eden Finance Leaderboard</h1>
          <p className="text-gray-400">
            Track the top performers in the Eden Finance ecosystem and see how
            you compare.
          </p>
        </div>
        <ConnectButton />
      </div>
      <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-4">
        <CustomTabs
          options={tabOptions}
          value={timeFilter}
          onChange={(value) => {
            setTimeFilter(value as TimeFilter)
            setPage(1) // Reset to first page when changing time filter
          }}
        />

        <div className="relative">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by address or ENS..."
            className="w-[300px] border-gray-800 bg-gray-900 pl-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={totalUsers.toLocaleString()}
          change={userChange}
          icon="users"
        />
        <StatsCard
          title="Total Supplied"
          value={`${(totalSupplied / 1000000).toFixed(1)}M`}
          change={suppliedChange}
          icon="trending-up"
        />
        <StatsCard
          title="Total Borrowed"
          value={`${(totalBorrowed / 1000000).toFixed(1)}M`}
          change={borrowedChange}
          icon="trending-down"
        />
        <StatsCard
          title="Available Assets"
          value={availableAssets.toString()}
          subtext="total assets"
          icon="database"
        />
      </div>

      {error ? (
        <div className="rounded-lg bg-red-900/20 p-4 text-red-500">{error}</div>
      ) : (
        <LeaderboardTable
          data={filteredData}
          page={page}
          setPage={setPage}
          totalPages={pagination?.total_pages || 1}
          totalItems={pagination?.total || 0}
          timeFilter={timeFilter}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default LeaderBoard
