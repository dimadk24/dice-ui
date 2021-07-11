import { ReactNode, useEffect, useState } from 'react'
import { DebugProps } from '@react-three/cannon/dist/Debug'

type DebugInDevProps = {
  children: ReactNode
}

export function DebugInDev({ children }: DebugInDevProps): JSX.Element {
  const [DebugElement, setDebugElement] = useState<
    ((props: DebugProps) => JSX.Element) | null
  >(null)
  useEffect(() => {
    async function fetch() {
      const { Debug } = await import('@react-three/cannon')
      setDebugElement(() => Debug)
    }

    if (process.env.NODE_ENV === 'development') {
      fetch()
    }
  }, [])
  if (DebugElement) {
    return <DebugElement scale={1.1}>{children}</DebugElement>
  }
  return <>{children}</>
}
