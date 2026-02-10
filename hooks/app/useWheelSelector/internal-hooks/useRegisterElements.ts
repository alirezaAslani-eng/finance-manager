import { UseWheelSelectorReturnType } from "@/hooks/app/types";
import { BaseInternalHooksProps } from "@/hooks/app/useWheelSelector/internal-hooks/types";
import { useCallback } from "react";

interface UseRegisterProps extends Pick<
  BaseInternalHooksProps,
  "optionListRef" | "scrollContainerRef"
> {}

export default function useRegisterElements({
  optionListRef,
  scrollContainerRef,
}: UseRegisterProps) {
  /**
   * call and spread this function on your each option tag to conect them with IntesectionObsever
   */
  const registerEachOption: UseWheelSelectorReturnType["registerEachOption"] =
    useCallback((index) => {
      return {
        ref: (optionEl) => {
          if (!optionEl) return;
          optionListRef.current[index] = optionEl;
        },
      };
    }, []);

  /**
   * call and spread this function on the scroll container parent of option tags because this hook need to access to its scrolling properties by using its ref
   */
  const registerScrollContainer: UseWheelSelectorReturnType["registerScrollContainer"] =
    useCallback(() => {
      return {
        ref: (_scrollContainerRef) => {
          if (!_scrollContainerRef) return;
          scrollContainerRef.current = _scrollContainerRef;
        },
      };
    }, []);

  return {
    registerEachOption,
    registerScrollContainer,
  };
}
