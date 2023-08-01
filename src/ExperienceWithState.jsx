import { useState } from "react";
import {
  Center,
  Text3D,
  OrbitControls,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
  const [torusGeometry, setTorusGeometry] = useState();
  const [torusMaterial, setTorusMaterial] = useState();

  const [matcapTextureText] = useMatcapTexture(
    "1A2461_3D70DB_2C3C8F_2C6CAC",
    256
  );
  const [matcapTextureTorus] = useMatcapTexture(
    "1D3FCC_051B5F_81A0F2_5579E9",
    256
  );

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setTorusMaterial} matcap={matcapTextureTorus} />

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
