import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import PlaceHolder from "./components/PlaceHolder";
// import FlightHelmetModel from "./components/FlightHelmetModel";
// import HamburgerModel from "./components/HamburgerModel";
import HamburgerModelComponent from "./components/HamburgerModelComponent";
import FoxModel from "./components/FoxModel";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.5} />

      <mesh
        receiveShadow
        rotation-x={-Math.PI * 0.5}
        position-y={-1}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <Suspense fallback={<PlaceHolder position-y={0.5} scale={[2, 3, 2]} />}>
        {/* <FlightHelmetModel /> */}
        {/* <HamburgerModel /> */}
        <HamburgerModelComponent scale={0.35} />
        <FoxModel />
      </Suspense>
    </>
  );
}
