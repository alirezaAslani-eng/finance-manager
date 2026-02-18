import { UseWheelSelectorReturnType } from "@/hooks/app/types";
import { useCallback, useRef, useState } from "react";

export default function useRegisterElements() {
  // * -------------- Scroll container element --------------
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);

  // * -------------- option elements --------------
  const [optionElements, setOptionElements] = useState<
    (HTMLOptionElement | null)[]
  >([]);

  const optionElementRegistering = useCallback(
    (optionNode: null | HTMLOptionElement, index: number) => {
      setOptionElements((prev) => {
        prev[index] = optionNode;
        return [...prev];
      });
    },
    [setOptionElements],
  );
  /**
   * call and spread this function on your each option tag to conect them with IntesectionObsever
   */
  const registerEachOption: UseWheelSelectorReturnType["registerEachOption"] =
    useCallback(
      (index) => {
        return {
          ref: (optionEl) => {
            optionElementRegistering(optionEl, index);
          },
        };
      },
      [optionElementRegistering],
    );

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
    scrollContainerRef,
    optionElements,
  };
}
