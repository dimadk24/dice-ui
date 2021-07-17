import { usePlane } from '@react-three/cannon'
// import { RepeatWrapping, TextureLoader } from 'three'
// import woodenTableTextureUrl from './black-wood.jpeg'
// import { useLoader } from '@react-three/fiber'

export function Surface(): JSX.Element {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }))
  // const texture = useLoader(TextureLoader, woodenTableTextureUrl)
  // texture.wrapS = RepeatWrapping
  // texture.repeat.set(4, 1)

  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[20, 20]} />
      <meshStandardMaterial />
    </mesh>
  )
}
