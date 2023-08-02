import ReactDOM from "react-dom/client";
import "./index.css";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [-4, 3, 8],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas camera={cameraSettings}>
    <Experience />
  </Canvas>
);
