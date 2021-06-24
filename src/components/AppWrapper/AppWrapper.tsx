import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react'
import { Alert, AppRoot } from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge'
import { Utils } from '../../Utils'
import { App } from '../App/App'
import { WithUser } from '../../core/components/WithUser'
import { trackers } from '../../core/trackers/trackers'
import { Themes } from '../../constants'
import '@vkontakte/vkui/dist/vkui.css'

export function AppWrapper(): JSX.Element {
  const [popout, setPopout] = useState<JSX.Element | null>(null)
  const [theme, setTheme] = useState<Themes>(Themes.bright_light)

  useEffect(() => {
    bridge.send('VKWebAppInit')
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        // @ts-ignore
        setTheme(data.scheme || Themes.bright_light)
      }
    })
  }, [])

  useEffect(() => {
    const schemeAttribute = document.createAttribute('scheme')
    schemeAttribute.value = theme
    document.body.attributes.setNamedItem(schemeAttribute)
  }, [theme])

  useEffect(() => {
    if (Utils.isProductionMode) {
      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        beforeSend(event, hint) {
          if (event.exception) {
            const errorMessage =
              hint &&
              hint.originalException &&
              hint.originalException instanceof Error &&
              hint.originalException.message
                ? hint.originalException.message
                : ''
            setPopout(
              <Alert
                actions={[
                  {
                    mode: 'default',
                    title: 'ОК',
                    autoclose: true,
                  },
                ]}
                onClose={() => setPopout(null)}
              >
                <h3>Возникла ошибка =(</h3>
                {errorMessage && <p>{errorMessage}</p>}
                <p>Попробуй еще раз</p>
              </Alert>
            )
          }
          return event
        },
      })
    }
    trackers.init()
    trackers.reachGoal('open app')
  }, [])

  return (
    <AppRoot>
      <WithUser>
        {({ loadingUser }) => <App loadingUser={loadingUser} popout={popout} />}
      </WithUser>
    </AppRoot>
  )
}
