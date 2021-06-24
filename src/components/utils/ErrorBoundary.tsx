import * as Sentry from '@sentry/react'
import { Button } from '@vkontakte/vkui'
import { Utils } from '../../Utils'

type Props = {
  children: JSX.Element
}

/**
 * Component catches only errors in rendering phase and lifecycle
 * Errors in click and async handlers need to be caught and rendered separately
 */
export function ErrorBoundary({ children }: Props): JSX.Element {
  if (!Utils.isProductionMode) return children

  return (
    <Sentry.ErrorBoundary
      fallback={({ error, componentStack, resetError }) => (
        <>
          <div>Ошибка отрисовки:</div>
          <p>{error.message}</p>
          <p>{componentStack}</p>
          <Button onClick={resetError}>Попробовать еще раз</Button>
        </>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  )
}
