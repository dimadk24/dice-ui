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
import {
  Icon28Dice5Outline,
  Icon24GearOutline,
  Icon28HelpOutline,
} from '@vkontakte/icons'

type Props = {
  loadingUser: boolean
  popout: JSX.Element | null
}

const views = [
  {
    title: 'Главная',
    Icon: Icon28Dice5Outline,
    storyId: 'dice',
    renderView: (): JSX.Element | string => 'dice home',
  },
  {
    title: 'Настройки',
    Icon: Icon24GearOutline,
    storyId: 'settings',
    renderView: (): JSX.Element | string => 'settings home',
  },
  {
    title: 'Помощь',
    Icon: Icon28HelpOutline,
    storyId: 'help',
    renderView: (): JSX.Element | string => 'help home',
  },
]

export function App({ loadingUser, popout }: Props): JSX.Element {
  const [loadingTooLong, setLoadingTooLong] = useState(false)
  const [activeStory, setActiveStory] = useState('dice')

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
          {views.map(({ Icon, storyId, title }) => (
            <TabbarItem
              text={title}
              selected={activeStory === storyId}
              onClick={() => setActiveStory(storyId)}
              key={storyId}
            >
              <Icon />
            </TabbarItem>
          ))}
        </Tabbar>
      }
    >
      {views.map(({ storyId, renderView }) => (
        <View
          id={storyId}
          activePanel={`${storyId}-home`}
          popout={popoutToRender}
          key={storyId}
        >
          <Panel id={`${storyId}-home`}>{renderView()}</Panel>
        </View>
      ))}
    </Epic>
  )
}
