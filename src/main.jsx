import ReactDOM from "react-dom/client";
import "./index.css";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [-4, 3, 6],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas
    gl={{
      antialias: true,
      toneMapping: ACESFilmicToneMapping,
      outputColorSpace: SRGBColorSpace,
    }}
    orthographic={false}
    camera={cameraSettings}
  >
    <Experience />
  </Canvas>
);
