import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";

export default function FoxModel() {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationName } = useControls("animation", {
    animationName: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.75).play();

    return () => {
      action.fadeOut(1);
    };
  }, [animationName]);

  return (
    <primitive
      object={fox.scene}
      scale={0.02}
      position={[-2.5, 0, 2.5]}
      rotation-y={0.3}
    />
  );
}
