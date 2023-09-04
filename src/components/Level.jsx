import * as THREE from "three";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { useGLTF, Float, Text } from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

export function StartBlock({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
    </group>
  );
}

export function SpinnerBlock({ position = [0, 0, 0] }) {
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );
  const obstacleRef = useRef();

  useFrame((state) => {
    if (obstacleRef.current) {
      const time = state.clock.getElapsedTime();
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));

      obstacleRef.current.setNextKinematicRotation(rotation);
    }
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />

      <RigidBody
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        ref={obstacleRef}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function LimboBlock({ position = [0, 0, 0] }) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  const obstacleRef = useRef();

  useFrame((state) => {
    if (obstacleRef.current) {
      const time = state.clock.getElapsedTime() + timeOffset;
      const y = 0.3 + 1 + Math.sin(time);

      obstacleRef.current.setNextKinematicTranslation({
        x: position[0],
        y,
        z: position[2],
      });
    }
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />

      <RigidBody
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        ref={obstacleRef}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function MovingWallBlock({ position = [0, 0, 0] }) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  const obstacleRef = useRef();

  useFrame((state) => {
    if (obstacleRef.current) {
      const time = state.clock.getElapsedTime() + timeOffset;
      const x = (Math.sin(time) * (4 - 1.5)) / 2;

      obstacleRef.current.setNextKinematicTranslation({
        x,
        y: position[1] + 1.5 / 2,
        z: position[2],
      });
    }
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />

      <RigidBody
        type="kinematicPosition"
        position={[0, 1.5, 0]}
        restitution={0.2}
        friction={0}
        ref={obstacleRef}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function EndBlock({ position = [0, 0, 0] }) {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <Text
        font="./bebas-neue-v9-latin-regular.woff"
        scale={1}
        position={[0, 2.25, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        receiveShadow
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        restitution={0.2}
        friction={0}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}

export function Bounds({ length = 1 }) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        position={[2.15, 0.75, -(length * 2) + 2]}
        scale={[0.3, 1.5, length * 4]}
        castShadow
      />
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        position={[-2.15, 0.75, -(length * 2) + 2]}
        scale={[0.3, 1.5, length * 4]}
        receiveShadow
      />
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        position={[0, 0.75, -(length * 4) + 2]}
        scale={[4, 1.5, 0.3]}
        receiveShadow
      />
      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
}

export function Level({
  count = 5,
  types = [SpinnerBlock, MovingWallBlock, LimboBlock],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <StartBlock position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={`block-${index}`} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <EndBlock position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
}
