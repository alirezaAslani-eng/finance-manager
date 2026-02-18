import { RefObject } from "react";

interface BaseInternalHooksProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  optionElements: (HTMLOptionElement | null)[];
  option_height: number;
  value?: string;
}

export type { BaseInternalHooksProps };
