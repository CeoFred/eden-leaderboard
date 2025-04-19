'use client'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ConnectButton from '~/components/miscellaneous/connect-button'
import { CustomTabs } from '~/components/miscellaneous/custom-tabs'
import { generateDummyData, TimeFilter, UserData } from './data'
import { Input } from '~/components/ui/input'
import { StatsCard } from '~/components/cards/stat-card'
import { LeaderboardTable } from './leaderboard-table'

const LeaderBoard = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState<UserData[]>([])
  const [filteredData, setFilteredData] = useState<UserData[]>([])
  const itemsPerPage = 10

  const tabOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
  ]

  useEffect(() => {
    const generatedData = generateDummyData(100)
    setData(generatedData)
  }, [])

  useEffect(() => {
    let filtered = [...data]

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (timeFilter === 'day') {
      filtered.sort((a, b) => b.pointsDaily - a.pointsDaily)
    } else if (timeFilter === 'week') {
      filtered.sort((a, b) => b.pointsWeekly - a.pointsWeekly)
    } else if (timeFilter === 'month') {
      filtered.sort((a, b) => b.pointsMonthly - a.pointsMonthly)
    } else {
      filtered.sort((a, b) => b.pointsAllTime - a.pointsAllTime)
    }

    setFilteredData(filtered)
    setPage(1)
  }, [data, searchQuery, timeFilter])

  const totalUsers = data.length
  const totalSupplied = filteredData.reduce(
    (sum, user) => sum + user.supplied,
    0
  )
  const totalBorrowed = filteredData.reduce(
    (sum, user) => sum + user.borrowed,
    0
  )
  const availableAssets = 4

  const userChange = '+12.5'
  const suppliedChange = '+12.5'
  const borrowedChange = '+12.5'

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

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
          onChange={(value) => setTimeFilter(value as TimeFilter)}
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
      <LeaderboardTable
        data={paginatedData}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        totalItems={filteredData.length}
        timeFilter={timeFilter}
      />
    </div>
  )
}

export default LeaderBoard
