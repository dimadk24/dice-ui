import diceUrl from './red-dice.obj'
import diceMaterialUrl from './red-dice.mtl'
import { MathUtils } from 'three'
import { useBox } from '@react-three/cannon'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useEffect, useState } from 'react'
import { Group } from 'three/src/Three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

const diceScale = 0.55

export function Dice(): JSX.Element {
  const [dice, setDice] = useState<Group | null>(null)

  useEffect(() => {
    async function fetch() {
      const mtlLoader = new MTLLoader()
      const mtl = await mtlLoader.loadAsync(diceMaterialUrl)
      mtl.preload()
      const objLoader = new OBJLoader()
      objLoader.setMaterials(mtl)
      const loadedDice = await objLoader.loadAsync(diceUrl)
      loadedDice.scale.set(diceScale, diceScale, diceScale)
      setDice(loadedDice)
    }

    fetch()
  }, [])

  const [ref] = useBox(() => ({
    mass: 0.05,
    position: [0, 2, 0],
    rotation: [0, 0, MathUtils.degToRad(30)],
  }))

  return (
    <mesh ref={ref} scale={[diceScale, diceScale, diceScale]}>
      <boxBufferGeometry />
      {dice && (
        <mesh>
          <primitive object={dice} />
        </mesh>
      )}
    </mesh>
  )
}
