import ReactDOM from "react-dom/client";
import "./index.css";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./components/Interface";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [2.5, 4, 6],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <KeyboardControls
    map={[
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
      { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
    ]}
  >
    <Canvas shadows camera={cameraSettings}>
      <Experience />
    </Canvas>
    <Interface />
  </KeyboardControls>
);
