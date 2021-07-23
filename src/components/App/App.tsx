import { Panel, ScreenSpinner, View } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { DELAY_BEFORE_LOADER } from '../utils/Loader'
import { Icon28Dice5Outline } from '@vkontakte/icons'
import DiceHome from '../panels/DiceHome/DiceHome'

type Props = {
  loadingUser: boolean
  popout: JSX.Element | null
}

const views = [
  {
    title: 'Главная',
    Icon: Icon28Dice5Outline,
    storyId: 'dice',
    renderView: (): JSX.Element | string => <DiceHome />,
  },
]

export function App({ loadingUser, popout }: Props): JSX.Element {
  const [loadingTooLong, setLoadingTooLong] = useState(false)

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
    <>
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
    </>
  )
}
