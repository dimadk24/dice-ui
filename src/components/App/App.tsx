import {
  Epic,
  Panel,
  ScreenSpinner,
  Tabbar,
  TabbarItem,
  View,
} from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { DELAY_BEFORE_LOADER } from '../utils/Loader'

type Props = {
  loadingUser: boolean
  popout: JSX.Element | null
}

export function App({ loadingUser, popout }: Props): JSX.Element {
  const [loadingTooLong, setLoadingTooLong] = useState(false)
  const [activeStory, setActiveStory] = useState('dice')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activePanel, setActivePanel] = useState('home')

  useEffect(() => {
    let timerId: number
    if (loadingUser)
      timerId = window.setTimeout(() => {
        setLoadingTooLong(true)
      }, DELAY_BEFORE_LOADER)
    else setLoadingTooLong(false)
    return () => {
      clearTimeout(timerId)
    }
  }, [loadingUser])

  let popoutToRender: JSX.Element | null = null
  if (popout) popoutToRender = popout
  else if (loadingUser && loadingTooLong) popoutToRender = <ScreenSpinner />
  return (
    <Epic
      activeStory={activeStory}
      tabbar={
        <Tabbar>
          <TabbarItem
            text="Главная"
            selected={activeStory === 'dice'}
            onClick={() => {
              setActiveStory('game')
            }}
          />
        </Tabbar>
      }
    >
      <View id="dice" activePanel={activePanel} popout={popoutToRender}>
        <Panel id="home">main</Panel>
      </View>
    </Epic>
  )
}
