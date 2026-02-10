import { useEffect, useRef, useState } from "react";
import { BaseInternalHooksProps } from "./types";
import { isValidElement, isValidElements } from "@/utils";

interface UseHeightOfScrollContainerProps extends Pick<
  BaseInternalHooksProps,
  "optionListRef" | "scrollContainerRef"
> {}

function useHeightOfScrollContainer({
  optionListRef,
  scrollContainerRef,
}: UseHeightOfScrollContainerProps) {
  const [scroll_container_height, set_scroll_container_height] =
    useState<number>(0);
  const [option_height, set_option_height] = useState<number>(0);
  useEffect(() => {
    const OptionElements = isValidElements(optionListRef.current);
    const ScrollContainerElement = isValidElement(scrollContainerRef.current);
    if (!OptionElements || !ScrollContainerElement) return;
    set_scroll_container_height(ScrollContainerElement.offsetHeight);
    set_option_height(OptionElements[0].offsetHeight);
  }, [set_scroll_container_height, set_option_height]);
  return {
    scroll_container_height: scroll_container_height,
    option_height: option_height,
  };
}

export default useHeightOfScrollContainer;
