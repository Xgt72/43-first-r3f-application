import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  useCursor,
  useGLTF,
  meshBounds,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

export default function Experience() {
  const [cubeHovered, setCubeHovered] = useState(false);
  const cubeRef = useRef();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta * 0.2;
  });

  const eventHandler = (event) => {
    console.log("---");
    console.log("distance", event.distance); // Distance between camera and hit point
    console.log("point", event.point); // Hit point coordinates (in 3D)
    console.log("uv", event.uv); // UV coordinates on the geometry (in 2D)
    console.log("object", event.object); // The object that triggered the event
    console.log("eventObject", event.eventObject); // The object that was listening to the event (useful where there is objects in objects)

    console.log("---");
    console.log("x", event.x); // 2D screen coordinates of the pointer
    console.log("y", event.y); // 2D screen coordinates of the pointer

    console.log("---");
    console.log("shiftKey", event.shiftKey); // If the SHIFT key was pressed
    console.log("ctrlKey", event.ctrlKey); // If the CTRL key was pressed
    console.log("metaKey", event.metaKey); // If the COMMAND key was pressed

    cubeRef.current.material.color.set(
      `hsl(${Math.random() * 360}, 100%, 75%)`
    );
  };

  useCursor(cubeHovered);

  const hamburgerModel = useGLTF("./hamburger-draco.glb");

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh
        ref={cubeRef}
        raycast={meshBounds}
        position-x={2}
        rotation-y={Math.PI * 0.25}
        scale={1.5}
        onClick={eventHandler}
        onPointerEnter={() => setCubeHovered(true)}
        onPointerLeave={() => setCubeHovered(false)}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        position-x={-2}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        onClick={(e) => {
          e.stopPropagation();
          console.log(e.object.name);
        }}
        object={hamburgerModel.scene}
        scale={0.25}
        position-y={0.5}
      />
    </>
  );
}
