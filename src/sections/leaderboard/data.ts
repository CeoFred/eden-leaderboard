export type TimeFilter = 'day' | 'week' | 'month' | 'all'

export interface UserData {
  id: string
  name: string
  address: string
  avatar: string
  borrowed: number
  supplied: number
  pointsDaily: number
  pointsWeekly: number
  pointsMonthly: number
  pointsAllTime: number
}

// Generate random avatar URL
const getRandomAvatar = () => {
  const randomId = Math.floor(Math.random() * 1000)
  return `/placeholder.svg?height=40&width=40&text=${randomId}`
}

export const generateDummyData = (count: number): UserData[] => {
  const users: UserData[] = []

  users.push({
    id: '1',
    name: 'Web3Lord.eth',
    address: '0x4ea...9a22f4',
    avatar: getRandomAvatar(),
    borrowed: 1250000,
    supplied: 850000,
    pointsDaily: 1158570,
    pointsWeekly: 1158570,
    pointsMonthly: 1158570,
    pointsAllTime: 1158570,
  })

  users.push({
    id: '2',
    name: 'CryptoGod',
    address: '0x4ea...9a22f4',
    avatar: getRandomAvatar(),
    borrowed: 1200000,
    supplied: 500000,
    pointsDaily: 1158500,
    pointsWeekly: 1158500,
    pointsMonthly: 1158500,
    pointsAllTime: 1158500,
  })

  for (let i = 3; i <= count; i++) {
    const basePoints = 1158500 - (i - 2) * 100
    const borrowed = i === 1 ? 1250000 : 1200000
    const supplied = i === 1 ? 850000 : 500000

    users.push({
      id: i.toString(),
      name: 'Lanky.eth',
      address: '0x4ea...9a22f4',
      avatar: getRandomAvatar(),
      borrowed,
      supplied,
      pointsDaily: basePoints - Math.floor(Math.random() * 1000),
      pointsWeekly: basePoints,
      pointsMonthly: basePoints + Math.floor(Math.random() * 1000),
      pointsAllTime: basePoints + Math.floor(Math.random() * 2000),
    })
  }

  return users
}
