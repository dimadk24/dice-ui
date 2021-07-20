import { usePlane } from '@react-three/cannon'
import { PlaneProps } from '@react-three/cannon/src/hooks'

const WALL_LENGTH = 30

export function Wall(props: PlaneProps): JSX.Element {
  const [ref] = usePlane(() => props)
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[WALL_LENGTH, WALL_LENGTH]} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  )
}
