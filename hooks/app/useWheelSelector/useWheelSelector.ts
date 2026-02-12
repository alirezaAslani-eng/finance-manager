import { useEffect, useMemo, useRef } from "react";
import {
  intersectionObserverElements,
  isValidElement,
  isValidElements,
} from "@/utils";
import {
  UseWheelSelectorReturnType,
  UseWheelSelectorConfig,
} from "@/hooks/app/types";
import { calculateRootMargin } from "@/hooks/app/useWheelSelector/helpers";
import {
  useHeightOfScrollContainerAndOption,
  usePrevNextOption,
  useRegisterElements,
  useScrollInitializer,
} from "@/hooks/app/useWheelSelector/internal-hooks";
import useAddEventListener from "../useAddEventListener";

const useWheelSelector = ({
  onChange = () => {},
  active_className = "active-option",
  value,
}: UseWheelSelectorConfig = {}): UseWheelSelectorReturnType => {
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);
  const optionListRef = useRef<HTMLOptionElement[]>([]);
  const inViewOptionValue = useRef<string>(value || "");

  const { registerEachOption, registerScrollContainer } = useRegisterElements({
    optionListRef,
    scrollContainerRef,
  });

  const { option_height, scroll_container_height } =
    useHeightOfScrollContainerAndOption({
      optionListRef,
      scrollContainerRef,
    });

  const { nextOption, prevOption } = usePrevNextOption({
    option_height,
    scrollContainerRef,
  });

  useScrollInitializer({ optionListRef, value });

  const changeHandler = (value: string): void => {
    onChange(value);
  };

  useAddEventListener(
    {
      el: scrollContainerRef.current,
      type: "scrollend",
      listener(e) {
        changeHandler(inViewOptionValue.current);
      },
    },
    [changeHandler],
  );

  /**
   * This useEffect enables an IntersectionObserver on each
   * option tag to trigger a className to centered option in scroll container and update inViewed value
   */
  useEffect(() => {
    const OptionElements = isValidElements(optionListRef.current);
    const ScrollContainerElement = isValidElement(scrollContainerRef.current);
    if (!OptionElements || !ScrollContainerElement) return;

    const { unobserveElements } = intersectionObserverElements({
      elements: OptionElements,
      root: ScrollContainerElement,
      rootMargin: calculateRootMargin({
        scroll_container_height,
        option_height,
      }),
      threshold: 0.5,
      entry: ([entry]) => {
        const { isIntersecting, target: _target } = entry;
        const target = _target as HTMLOptionElement;

        target.classList.remove(active_className);

        if (isIntersecting) {
          target.classList.add(active_className);
          inViewOptionValue.current = target.value;
        }
      },
    });

    return () => {
      unobserveElements();
    };
  }, [
    intersectionObserverElements,
    calculateRootMargin,
    scroll_container_height,
    option_height,
    changeHandler,
  ]);

  return useMemo(() => {
    return {
      prevOption,
      nextOption,
      registerEachOption,
      registerScrollContainer,
    };
  }, [prevOption, nextOption, registerEachOption, registerScrollContainer]);
};

export default useWheelSelector;
