import { useEffect, useState } from 'react'
import { trackers } from '../trackers/trackers'
import bridge, { UserInfo } from '@vkontakte/vk-bridge'

type Props = {
  children({
    user,
    loadingUser,
  }: {
    user: UserInfo | null
    loadingUser: boolean
  }): JSX.Element
}

export function WithUser({ children }: Props): JSX.Element {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loadingUser, setLoadingUser] = useState(false)

  async function fetchUser(isInitialRequest = false) {
    setLoadingUser(true)
    try {
      const vkUser = await bridge.send('VKWebAppGetUserInfo')
      setUser(vkUser)
      if (isInitialRequest) {
        trackers.identify(vkUser.id)
      }
    } finally {
      setLoadingUser(false)
    }
  }

  useEffect(() => {
    fetchUser(true)
  }, [])

  return children({
    user,
    loadingUser,
  })
}
