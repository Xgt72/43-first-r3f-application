import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

export default function EndBlock({
  geometry,
  material,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  type = "fixed",
}) {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <mesh
        geometry={geometry}
        material={material}
        receiveShadow
        position={[0, 0, 0]}
        scale={scale}
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
