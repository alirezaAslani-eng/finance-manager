import { CSSProperties } from "react";

type GradientMethod = "linear-gradient";
type Anchores = "left" | "right" | "top" | "bottom";

interface GradientConfig {
  gradientMethod?: GradientMethod;
  deg: `to ${Anchores}` | `${number}deg`;
  colors: CSSProperties["color"][];
}

export type { GradientConfig };
