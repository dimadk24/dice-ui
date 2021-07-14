import { useLoader } from '@react-three/fiber'
import { LWOLoader } from 'three/examples/jsm/loaders/LWOLoader'
import oneDiceUrl from './one-dice.lwo'
import { MathUtils } from 'three'
import { useBox } from '@react-three/cannon'

const diceScale = 0.55

export function Dice(): JSX.Element {
  const loadedDice = useLoader(LWOLoader, oneDiceUrl)
  const dice = loadedDice.meshes[0]
  dice.scale.set(0.25, 0.25, 0.25)
  dice.rotation.set(0, 0, MathUtils.degToRad(-45))
  dice.position.set(-0.5, -0.5, 0)

  const [ref] = useBox(() => ({
    mass: 0.05,
    position: [0, 2, 0],
    rotation: [0, 0, MathUtils.degToRad(30)],
  }))

  return (
    <mesh ref={ref} scale={[diceScale, diceScale, diceScale]}>
      <boxBufferGeometry />
      <meshBasicMaterial opacity={0} transparent />
      <mesh>
        <primitive object={dice} />
      </mesh>
    </mesh>
  )
}
