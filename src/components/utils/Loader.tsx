import { useEffect, useState } from 'react'
import { PanelSpinner } from '@vkontakte/vkui'

type Props = {
  delay?: number
  render?(): JSX.Element | null
}

export const DELAY_BEFORE_LOADER = 200

function Loader({
  delay = DELAY_BEFORE_LOADER,
  render = () => <PanelSpinner size="large" />,
}: Props): JSX.Element | null {
  const [pastDelay, setPastDelay] = useState(false)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setPastDelay(true)
    }, delay)
    return () => {
      clearTimeout(timerId)
    }
  }, [delay])

  if (pastDelay) return render()
  return null
}

export default Loader
