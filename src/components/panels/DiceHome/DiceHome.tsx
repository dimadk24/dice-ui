import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { LWOLoader } from 'three/examples/jsm/loaders/LWOLoader'
import oneDiceUrl from './one-dice.lwo'
import { Debug, Physics, useBox, usePlane } from '@react-three/cannon'
import { MathUtils } from 'three'

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
  }))
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[100, 100]} />
    </mesh>
  )
}

function Dice() {
  const loadedDice = useLoader(LWOLoader, oneDiceUrl)
  const dice = loadedDice.meshes[0]
  dice.scale.set(0.25, 0.25, 0.25)
  dice.rotation.set(0, 0, MathUtils.degToRad(-45))
  dice.position.set(-0.5, -0.5, 0)

  const [ref] = useBox(() => ({
    mass: 0.05,
    position: [0, 0, 0],
    rotation: [0, 0, MathUtils.degToRad(30)],
  }))

  return (
    <mesh ref={ref} scale={[0.8, 0.8, 0.8]}>
      <boxBufferGeometry />
      <meshBasicMaterial opacity={0} transparent />
      <mesh>
        <primitive object={dice} />
      </mesh>
    </mesh>
  )
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
          <Physics
            gravity={[0, -9.82, 0]}
            defaultContactMaterial={{
              friction: 0.9,
              restitution: 0.7,
              contactEquationStiffness: 1e7,
              contactEquationRelaxation: 1,
              frictionEquationStiffness: 1e7,
              frictionEquationRelaxation: 2,
            }}
          >
            <Debug scale={1.1}>
              <color attach="background" args={['lightgrey']} />
              <directionalLight color="white" position={[0, 1, 3]} />
              <Dice />
              <Plane />
            </Debug>
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default DiceHome
