import { JSX } from "react";

interface UseWheelSelectorConfig {
  onChange?: (value: string) => void;
  value?: string;
  active_className?: string;
}

interface UseWheelSelectorReturnType {
  prevOption: () => void;
  nextOption: () => void;
  registerEachOption: (
    index: number,
  ) => Pick<JSX.IntrinsicElements["option"], "ref">;
  registerScrollContainer: () => Pick<JSX.IntrinsicElements["div"], "ref">;
}

export type { UseWheelSelectorReturnType, UseWheelSelectorConfig };
