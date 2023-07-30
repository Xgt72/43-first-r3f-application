import { useControls } from "leva";

export default function Cube() {
  const { scale } = useControls("cube", {
    scale: 1,
  });

  return (
    <mesh position-x={2} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  );
}
