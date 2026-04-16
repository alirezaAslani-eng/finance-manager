import { Positions } from "@/types/css.types";
import { CSSProperties } from "react";

type GradientMethod = "linear-gradient";

interface GradientConfig {
  gradientMethod?: GradientMethod;
  deg: `to ${Positions}` | `${number}deg`;
  colors: (CSSProperties["color"] | string)[];
}

export type { GradientConfig };
