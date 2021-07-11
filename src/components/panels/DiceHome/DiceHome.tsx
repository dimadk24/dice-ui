import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Physics } from '@react-three/cannon'
import { Surface } from './react-three-components/Surface'
import { Dice } from './react-three-components/Dice/Dice'
import { DebugInDev } from './react-three-components/DebugInDev'

function DiceHome(): JSX.Element {
  return (
    <div>
      <Canvas
        style={{ height: '400px' }}
        onCreated={(threeState) => {
          // eslint-disable-next-line no-param-reassign
          threeState.gl.physicallyCorrectLights = true
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
            <DebugInDev>
              <color attach="background" args={['lightgrey']} />
              <directionalLight color="white" position={[0, 1, 3]} />
              <Dice />
              <Surface />
            </DebugInDev>
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default DiceHome
