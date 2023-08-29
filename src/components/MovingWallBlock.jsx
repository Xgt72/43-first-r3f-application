import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function MovingWallBlock({
  geometry,
  material,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  type = "fixed",
  obstacle,
}) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  const obstacleRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + timeOffset;
    const x = (Math.sin(time) * (scale[0] - obstacle.scale[0])) / 2;

    obstacleRef.current.setNextKinematicTranslation({
      x,
      y: position[1] + obstacle.scale[1] / 2,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={geometry}
        material={material}
        receiveShadow
        position={[0, -scale[1] / 2, 0]}
        scale={scale}
      />

      <RigidBody
        type="kinematicPosition"
        position={[0, obstacle.scale[1], 0]}
        restitution={0.2}
        friction={0}
        ref={obstacleRef}
      >
        <mesh
          geometry={obstacle.geometry}
          material={obstacle.material}
          scale={obstacle.scale}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
