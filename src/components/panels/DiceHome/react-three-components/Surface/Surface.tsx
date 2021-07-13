import { usePlane } from '@react-three/cannon'
import { Material, MeshBasicMaterial, TextureLoader } from 'three'
import { useEffect, useState } from 'react'
import woodenTableTextureUrl from './wooden-table.jpg'

export function Surface(): JSX.Element {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
  }))
  const [material, setMaterial] = useState<Material | undefined>()

  useEffect(() => {
    const fetchTexture = async () => {
      const loader = new TextureLoader()
      const texture = await loader.loadAsync(woodenTableTextureUrl)
      const fetchedMaterial = new MeshBasicMaterial({
        map: texture,
      })
      setMaterial(fetchedMaterial)
    }

    fetchTexture()
  }, [])

  return (
    <mesh ref={ref} material={material}>
      <planeBufferGeometry args={[10, 10]} />
    </mesh>
  )
}
