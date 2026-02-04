import { JSX } from "react";

interface UseWheelSelectorConfig<TValue> {
  onChange?: (value: TValue) => void;
  value?: TValue;
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
