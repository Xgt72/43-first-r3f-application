import "./index.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./Experience";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [-4, 3, 6],
};

// const created = ({ gl }) => {
//   gl.setClearColor("#ff0000", 1);
// };

// const created = ({ scene }) => {
//   scene.background = new THREE.Color("purple");
// };

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas
    camera={cameraSettings}
    // onCreated={created}
  >
    <Experience />
  </Canvas>
);
