import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Physics } from '@react-three/cannon'
import { Surface } from './react-three-components/Surface/Surface'
import { Dice } from './react-three-components/Dice/Dice'
import { DebugInDev } from './react-three-components/DebugInDev'
import styles from './DiceHome.module.css'
import { Euler, MathUtils } from 'three'

function DiceHome(): JSX.Element {
  return (
    <div className={styles.canvasWrapper}>
      <Canvas
        onCreated={(threeState) => {
          // eslint-disable-next-line no-param-reassign
          threeState.gl.physicallyCorrectLights = true
          threeState.camera.setRotationFromEuler(
            new Euler(MathUtils.degToRad(-60), 0, 0)
          )
          threeState.camera.translateY(3.5)
          threeState.camera.translateZ(4.5)
        }}
        gl={{ antialias: false, powerPreference: 'low-power' }}
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
              <directionalLight
                color="white"
                intensity={2.5}
                position={[0, 8, 5]}
              />
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
