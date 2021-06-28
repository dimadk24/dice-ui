import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { LWOLoader } from 'three/examples/jsm/loaders/LWOLoader'
import oneDiceUrl from './one-dice.lwo'

function Dice() {
  const loadedDice = useLoader(LWOLoader, oneDiceUrl)
  const dice = loadedDice.meshes[0]
  dice.scale.set(0.25, 0.25, 0.25)

  useFrame((state) => {
    dice.rotation.set(
      dice.rotation.x + (state.clock.getElapsedTime() % 0.1),
      0,
      0
    )
  })
  return <primitive object={dice} />
}

function DiceHome(): JSX.Element {
  return (
    <div>
      <Canvas
        style={{ height: '400px' }}
        onCreated={(state) => {
          // eslint-disable-next-line no-param-reassign
          state.gl.physicallyCorrectLights = true
        }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['lightgrey']} />
          <pointLight color="white" position={[0, 1, 3]} />
          <Dice />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default DiceHome
