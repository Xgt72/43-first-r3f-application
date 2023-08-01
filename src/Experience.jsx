import { useEffect, useRef } from "react";
import {
  Center,
  Text3D,
  OrbitControls,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const torusMaterial = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const donutsRef = useRef([]);

  const [matcapTextureText] = useMatcapTexture(
    "1A2461_3D70DB_2C3C8F_2C6CAC",
    256
  );
  const [matcapTextureTorus] = useMatcapTexture(
    "1D3FCC_051B5F_81A0F2_5579E9",
    256
  );

  useEffect(() => {
    matcapTextureTorus.colorSpace = THREE.SRGBColorSpace;
    matcapTextureTorus.needsUpdate = true;

    torusMaterial.matcap = matcapTextureTorus;
    torusMaterial.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donutsRef.current) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          HELLO R3F
          <meshMatcapMaterial matcap={matcapTextureText} />
        </Text3D>
      </Center>
      {[...Array(100)].map((value, index) => (
        <mesh
          key={`donut-${index}`}
          ref={(element) => {
            donutsRef.current[index] = element;
          }}
          geometry={torusGeometry}
          material={torusMaterial}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  );
}
