import { GradientConfig } from "./types";

function gradient({
  gradientMethod = "linear-gradient",
  deg,
  colors,
}: GradientConfig) {
  const serilizedColors = colors.join(", ");
  return `${gradientMethod}(${deg}, ${serilizedColors})`;
}

export default gradient;
