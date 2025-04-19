'use server'

import { ThemeState } from 'types'
import { cookies } from 'next/headers'
import { inDevEnvironment } from 'utils'

export const store_theme = async ({
  theme = 'system',
}: {
  theme: ThemeState
}) => {
  const maxAge = 60 * 60 * 24 * 400
  const cookieStore = await cookies()
  const cookieData = JSON.stringify(theme)
  cookieStore.set('theme', cookieData, {
    httpOnly: true,
    secure: !inDevEnvironment,
    maxAge,
    path: '/',
  })

  return theme
}

export const retrive_theme = async () => {
  const cookieStore = await cookies()
  const storedData = cookieStore.get('theme')?.value
  return storedData
    ? (JSON.parse(storedData as string) as ThemeState)
    : 'system'
}
