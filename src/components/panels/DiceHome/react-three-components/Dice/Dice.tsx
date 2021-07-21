import { useLoader } from '@react-three/fiber'
import { LWOLoader } from 'three/examples/jsm/loaders/LWOLoader'
import oneDiceUrl from './one-dice.lwo'
import { MathUtils } from 'three'
import { useBox } from '@react-three/cannon'
import { forwardRef, useImperativeHandle } from 'react'
import { Utils } from '../../../../../Utils'

const diceScale = 0.55

export type DiceRef = {
  roll(): void
}

export const Dice = forwardRef((props, ref): JSX.Element => {
  const loadedDice = useLoader(LWOLoader, oneDiceUrl)
  const dice = loadedDice.meshes[0]
  dice.scale.set(0.25, 0.25, 0.25)
  dice.rotation.set(0, 0, MathUtils.degToRad(-45))
  dice.position.set(-0.5, -0.5, 0)

  const [meshRef, meshApi] = useBox(() => ({
    mass: 0.1,
    position: [0, 2, 0],
    rotation: [0, 0, MathUtils.degToRad(30)],
  }))

  useImperativeHandle(ref, () => ({
    roll: () => {
      meshApi.velocity.set(
        Utils.generateRandomWithRandomSign(5, 10),
        Utils.generateRandomWithRandomSign(5, 10),
        Utils.generateRandomWithRandomSign(5, 10)
      )
      meshApi.angularVelocity.set(
        Utils.generateRandomWithRandomSign(5, 20),
        Utils.generateRandomWithRandomSign(5, 20),
        Utils.generateRandomWithRandomSign(5, 20)
      )
    },
  }))

  return (
    <mesh ref={meshRef} scale={[diceScale, diceScale, diceScale]}>
      <boxBufferGeometry />
      {/* collision box */}
      <meshBasicMaterial opacity={0} transparent />
      <mesh>
        {/* rendering material that is not affected by collisions */}
        <primitive object={dice} />
      </mesh>
    </mesh>
  )
})
