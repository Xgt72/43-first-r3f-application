import { forwardRef } from "react";
import DrunkEffect from "./DrunkEffect";

export default forwardRef(function Drunk(
  { frequency, amplitude, blendFunction },
  ref
) {
  const effect = new DrunkEffect({ frequency, amplitude, blendFunction });

  return <primitive ref={ref} object={effect} />;
});
