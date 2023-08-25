import { RigidBody } from "@react-three/rapier";

export default function StartBlock({
  geometry,
  material,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  type = "fixed",
}) {
  return (
    <group position={position}>
      <mesh
        geometry={geometry}
        material={material}
        receiveShadow
        position={[0, -scale[1] / 2, 0]}
        scale={scale}
      />
    </group>
  );
}
