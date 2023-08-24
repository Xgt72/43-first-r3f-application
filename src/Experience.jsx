import { useRef, useState, useEffect, useMemo } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  InstancedRigidBodies,
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
  const hamburger = useGLTF("./hamburger.glb");

  const [hitSound] = useState(() => new Audio("./hit.mp3"));

  const cubeRef = useRef();

  const cubeJump = () => {
    // console.log(cubeRef.current);
    const mass = cubeRef.current.mass();
    cubeRef.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 }, true);
    cubeRef.current.applyTorqueImpulse(
      {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5,
      },
      true
    );
  };

  const twisterRef = useRef();

  useFrame((state) => {
    if (twisterRef.current) {
      const time = state.clock.getElapsedTime();

      const eulerRotation = new THREE.Euler(0, time * 3, 0);
      const quaternionRotation = new THREE.Quaternion();
      quaternionRotation.setFromEuler(eulerRotation);
      twisterRef.current.setNextKinematicRotation(quaternionRotation);

      const angle = time * 0.5;
      const x = Math.cos(angle) * 2;
      const z = Math.sin(angle) * 2;
      twisterRef.current.setNextKinematicTranslation({
        x,
        y: twisterRef.current.translation().y,
        z,
      });
    }
  });

  const collisionEnter = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  const cubesCount = 300;
  // const cubesRef = useRef();

  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     cubesRef.current.setMatrixAt(i, matrix);
  //   }
  // }, []);

  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < cubesCount; i++) {
      const cubeInstance = {
        key: `instance_${i}`,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      };
      instances.push(cubeInstance);
    }

    return instances;
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={3.5} />
      <ambientLight intensity={0.5} />

      <Physics debug={false} gravity={[0, -9.81, 0]}>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        {/* <RigidBody
          colliders={false}
          rotation={[Math.PI * 0.5, 0, 0]}
          position={[0, 1, 0]}
        >
          <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider
            args={[0.25, 1, 0.25]}
            position={[0, 0, 1]}
            rotation={[-Math.PI * 0.35, 0, 0]}
          />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        <RigidBody
          position={[1.5, 2, 0]}
          ref={cubeRef}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
          // onCollisionEnter={collisionEnter}
          // onCollisionExit={() => {
          //   console.log("collision exit");
          // }}
          // onSleep={() => {
          //   console.log("Sleep");
          // }}
          // onWake={() => {
          //   console.log("Wake");
          // }}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
        </RigidBody>

        <RigidBody
          ref={twisterRef}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[0.1, 2, 5]} position={[-4.9, 2 - 1, 0]} />
          <CuboidCollider args={[0.1, 2, 5]} position={[4.9, 2 - 1, 0]} />
          <CuboidCollider args={[4.8, 2, 0.1]} position={[0, 2 - 1, -4.9]} />
          <CuboidCollider args={[4.8, 2, 0.1]} position={[0, 2 - 1, 4.9]} />
        </RigidBody>
        {/* 
        <instancedMesh
          ref={cubesRef}
          args={[null, null, cubesCount]}
          castShadow
        >
          <boxGeometry />
          <meshStandardMaterial color="tomato" />
        </instancedMesh> */}

        <InstancedRigidBodies instances={instances}>
          <instancedMesh
            args={[null, null, cubesCount]}
            castShadow
            receiveShadow
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
