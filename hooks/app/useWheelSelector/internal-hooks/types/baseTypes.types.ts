import { RefObject } from "react";

interface BaseInternalHooksProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  optionListRef: RefObject<HTMLOptionElement[]>;
  option_height: number;
  value?: string;
}

export type { BaseInternalHooksProps };
