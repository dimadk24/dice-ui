import { Wall } from '../Wall/Wall'
import { MathUtils } from 'three'

export function Walls(): JSX.Element {
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
        position={[-6.5, 0, 0]}
        key="left"
      />
      <Wall
        rotation={[0, MathUtils.degToRad(-115), 0]}
        position={[6.5, 0, 0]}
        key="right"
      />
      <Wall rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]} key="ceiling" />
    </>
  )
}
