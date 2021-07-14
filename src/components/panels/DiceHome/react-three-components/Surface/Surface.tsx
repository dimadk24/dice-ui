import { usePlane } from '@react-three/cannon'
import { TextureLoader } from 'three'
import woodenTableTextureUrl from './wooden-table.jpg'
import { useLoader } from '@react-three/fiber'

export function Surface(): JSX.Element {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }))
  const texture = useLoader(TextureLoader, woodenTableTextureUrl)

  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[20, 20]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
