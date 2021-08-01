import { Wall } from '../Wall/Wall'
import { MathUtils } from 'three'

interface WallsProps {
  viewWidth: number
}

export function Walls({ viewWidth }: WallsProps): JSX.Element {
  const bottomWallsOffset = viewWidth / 2
  const topWallsOffset = bottomWallsOffset * 1.3
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
        position={[-bottomWallsOffset, 0, 0]}
        key="bottom-left"
      />
      <Wall
        rotation={[0, MathUtils.degToRad(-115), 0]}
        position={[bottomWallsOffset, 0, 0]}
        key="bottom-right"
      />
      <Wall
        rotation={[0, MathUtils.degToRad(65), 0]}
        position={[-topWallsOffset, 0, 0]}
        key="top-left"
      />
      <Wall
        rotation={[0, MathUtils.degToRad(-65), 0]}
        position={[topWallsOffset, 0, 0]}
        key="top-right"
      />
      <Wall rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]} key="ceiling" />
    </>
  )
}
