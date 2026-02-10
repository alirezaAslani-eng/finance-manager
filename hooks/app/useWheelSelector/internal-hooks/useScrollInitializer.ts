import { useCallback, useEffect } from "react";
import { BaseInternalHooksProps } from "./types";

interface UseScrollInitializerProps extends Pick<
  BaseInternalHooksProps,
  "optionListRef" | "value"
> {}
/**
 * it only dose an initial scroll while first mount :
 *  move the option tag into the view, if the value from coponent's props is equal with one of options' value
 */
function useScrollInitializer({
  optionListRef,
  value,
}: UseScrollInitializerProps) {
  const initScroll = useCallback(() => {
    const optionListElements = optionListRef.current;
    if (!optionListElements) return;
    optionListElements.forEach((option) => {
      if (option.value === value) {
        option.scrollIntoView({ behavior: "instant", block: "center" });
        return;
      }
    });
  }, []);
  useEffect(() => {
    initScroll();
  }, [initScroll]);
}

export default useScrollInitializer;
