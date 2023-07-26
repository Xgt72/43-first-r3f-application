import ReactDOM from "react-dom/client";
import "./index.css";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const cameraSettings = {
  fov: 45,
  zoom: 100,
  near: 0.1,
  far: 200,
  position: [3, 2, 6],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas orthographic camera={cameraSettings}>
    <Experience />
  </Canvas>
);
