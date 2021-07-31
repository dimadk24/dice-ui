import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { Physics } from '@react-three/cannon'
import { Surface } from './react-three-components/Surface/Surface'
import { Dice, DiceRef } from './react-three-components/Dice/Dice'
import { DebugInDev } from './react-three-components/DebugInDev'
import styles from './DiceHome.module.css'
import { Euler, MathUtils, PerspectiveCamera } from 'three'
import { Walls } from './react-three-components/Walls/Walls'
import { Utils } from '../../../Utils'

const cameraYDistance = 3.5
const cameraZDistance = 4.5

function DiceHome(): JSX.Element {
  const diceRef = useRef<DiceRef>(null)
  const [fovWidth, setFovWidth] = useState(0)

  return (
    <div className={styles.canvasWrapper}>
      <Canvas
        onCreated={({ gl, camera }) => {
          // eslint-disable-next-line no-param-reassign
          gl.physicallyCorrectLights = true
          const perspectiveCamera = camera as PerspectiveCamera
          perspectiveCamera.setRotationFromEuler(
            new Euler(MathUtils.degToRad(-60), 0, 0)
          )
          perspectiveCamera.translateY(cameraYDistance)
          perspectiveCamera.translateZ(cameraZDistance)
          setFovWidth(
            Utils.getFovSize({
              cameraFov: perspectiveCamera.fov,
              cameraAspect: perspectiveCamera.aspect,
              yDistance: cameraYDistance,
              zDistance: cameraZDistance,
            })
          )
        }}
        gl={{ antialias: true }}
        onPointerMissed={() => diceRef.current?.roll()}
      >
        <Suspense fallback={null}>
          <Physics
            gravity={[0, -9.82, 0]}
            defaultContactMaterial={{
              friction: 0.1,
              restitution: 0.6,
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
              <Dice ref={diceRef} />
              <Surface />
              <Walls viewWidth={fovWidth} />
            </DebugInDev>
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default DiceHome
