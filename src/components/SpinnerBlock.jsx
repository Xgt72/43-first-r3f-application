import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SpinnerBlock({
  geometry,
  material,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  type = "fixed",
  obstacle,
}) {
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );
  const obstacleRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));

    obstacleRef.current.setNextKinematicRotation(rotation);
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
        <mesh {...obstacle} castShadow receiveShadow />
      </RigidBody>
    </group>
  );
}
