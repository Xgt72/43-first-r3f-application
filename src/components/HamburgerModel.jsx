import { Clone, useGLTF } from "@react-three/drei";

export default function HamburgerModel() {
  const model = useGLTF("./hamburger-draco.glb");

  return (
    <>
      <Clone object={model.scene} scale={0.35} position-x={-4} />;
      <Clone object={model.scene} scale={0.35} position-x={0} />
      <Clone object={model.scene} scale={0.35} position-x={4} />
    </>
  );
}

// preload the model
useGLTF.preload("./hamburger-draco.glb");
