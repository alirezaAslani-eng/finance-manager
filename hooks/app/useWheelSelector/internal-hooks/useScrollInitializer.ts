import { useCallback, useEffect, useRef } from "react";
import { BaseInternalHooksProps } from "./types";
import { isValidElements } from "@/utils";

interface UseScrollInitializerProps extends Pick<
  BaseInternalHooksProps,
  "optionElements" | "value"
> {}
/**
 * it only dose an initial scroll while first mount :
 *  move the option tag into the view, if the value from coponent's props is equal with one of options' value
 */
function useScrollInitializer({
  optionElements,
  value,
}: UseScrollInitializerProps) {
  const initScroll = useCallback(() => {
    // * -------------- elements validation ----------------
    const OptionListElements = isValidElements(optionElements);
    if (!OptionListElements) return;

    // * -------------- scroll into view based on value ----------------
    OptionListElements.forEach((option) => {
      if (option?.value && option.value === value) {
        option.scrollIntoView({ behavior: "smooth", block: "center"});
        return;
      }
    });
  }, [optionElements]);

  useEffect(() => {
    initScroll();
  }, [initScroll]);
}

export default useScrollInitializer;
