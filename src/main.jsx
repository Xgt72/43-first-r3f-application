import ReactDOM from "react-dom/client";
import "./index.css";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas>
    <Experience />
  </Canvas>
);
