import { Wall } from '../Wall/Wall'
import { MathUtils } from 'three'

interface WallsProps {
  viewWidth: number
}

export function Walls({ viewWidth }: WallsProps): JSX.Element {
  const wallsOffset = viewWidth / 2
  return (
    <>
      <Wall rotation={[0, 0, 0]} position={[0, 0, -7]} key="top" />
      <Wall
        rotation={[0, MathUtils.degToRad(180), 0]}
        position={[0, 0, 5]}
        key="bottom"
      />
      <Wall
        rotation={[0, MathUtils.degToRad(115), 0]}
        position={[-wallsOffset, 0, 0]}
        key="left"
      />
      <Wall
        rotation={[0, MathUtils.degToRad(-115), 0]}
        position={[wallsOffset, 0, 0]}
        key="right"
      />
      <Wall rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]} key="ceiling" />
    </>
  )
}
