import { usePlane } from '@react-three/cannon'

export function Surface(): JSX.Element {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }))

  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[20, 20]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}
