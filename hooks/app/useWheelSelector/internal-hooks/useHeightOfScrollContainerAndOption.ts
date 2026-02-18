import { useEffect, useRef, useState } from "react";
import { BaseInternalHooksProps } from "./types";
import { isValidElement, isValidElements } from "@/utils";

interface UseHeightOfScrollContainerProps extends Pick<
  BaseInternalHooksProps,
  "optionElements" | "scrollContainerRef"
> {}

function useHeightOfScrollContainer({
  optionElements,
  scrollContainerRef,
}: UseHeightOfScrollContainerProps) {
  const [scroll_container_height, set_scroll_container_height] =
    useState<number>(0);
  const [option_height, set_option_height] = useState<number>(0);

  useEffect(
    () => {
      // * ---------------- Elements Validation -----------------
      const OptionElements = isValidElements(optionElements);
      const ScrollContainerElement = isValidElement(scrollContainerRef.current);
      if (!OptionElements || !ScrollContainerElement) return;

      // * ---------------- set heights ---------------------
      set_scroll_container_height(ScrollContainerElement.offsetHeight);
      set_option_height(OptionElements[0]?.offsetHeight ?? 0);
    },
    // * ---------------- useEffect dependencies ---------------------
    [set_scroll_container_height, set_option_height, optionElements],
  );

  return {
    scroll_container_height: scroll_container_height,
    option_height: option_height,
  };
}

export default useHeightOfScrollContainer;
