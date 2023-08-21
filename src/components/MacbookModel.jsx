import { Html, useGLTF } from "@react-three/drei";

export default function MacbookModel() {
  const macbook = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );

  return (
    <primitive object={macbook.scene} position-y={-1.2}>
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={1.17}
        position={[0, 1.56, -1.4]}
        rotation-x={-0.256}
      >
        <iframe src="https://client-app-amazon-clone.js.xgeorget.dev/" />
      </Html>
    </primitive>
  );
}
