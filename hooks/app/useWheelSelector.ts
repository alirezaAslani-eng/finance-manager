import { experimental_useEffectEvent, useEffect, useRef } from "react";
import useCheckFirstMount from "./useCheckFirstMount";
import { intersectionObserverElements } from "@/utils";
import { UseWheelSelectorReturnType, UseWheelSelectorConfig } from "./types";

const useWheelSelector = <TValue = unknown>({
  onChange = () => {},
  active_className = "active-option",
  value,
}: UseWheelSelectorConfig<TValue>): UseWheelSelectorReturnType => {
  const { isFirstMount } = useCheckFirstMount();
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);
  const optionRefList = useRef<HTMLOptionElement[]>([]);
  const scroll_container_height = useRef<number>(0);
  const option_height = useRef<number>(0);

  const changeHandler = (value: TValue): void => {
    if (isFirstMount) return;
    onChange(value);
  };

  /**
   * This useEffect assigns the height of option tags and the scroll container to these two refs :
   * //* "scroll_container_height" and "option_height"
   */
  useEffect(() => {
    if (!!!optionRefList.current.length || !scrollContainerRef.current) return;
    scroll_container_height.current =
      scrollContainerRef.current.getBoundingClientRect().height;
    option_height.current =
      optionRefList.current[
        optionRefList.current.length - 1
      ].getBoundingClientRect().height;
  }, []);

  /**
   * This useEffect enables an IntersectionObserver on each
   * option tag to trigger a className to centered option in scroll container and call changeHandler
   */
  useEffect(() => {
    if (!!!optionRefList.current.length || !scrollContainerRef.current) return;
    const { unobserveElements } = intersectionObserverElements({
      elements: optionRefList.current,
      root: scrollContainerRef.current,
      rootMargin: calculateRootMargin({
        scroll_container_height: scroll_container_height.current,
        option_height: option_height.current,
      }),
      threshold: 0.5,
      entry: ([entry]) => {
        const { isIntersecting, target } = entry;
        target.classList.remove(active_className);
        if (isIntersecting) {
          target.classList.add(active_className);
          // @ts-ignore
          changeHandler(target.value);
        }
      },
    });
    return () => {
      unobserveElements();
    };
  }, [intersectionObserverElements, changeHandler]);

  /**
   * it only dose an initial scroll while first mount :
   *  move the option tag into the view, if the value from coponent's props is equal with one of options' value
   */
  const initScroll = () => {
    const optionListElements = optionRefList.current;
    if (!optionListElements) return;
    optionListElements.forEach((option) => {
      if (option.value !== value) return;
      option.scrollIntoView({ behavior: "instant", block: "center" });
    });
  };
  useEffect(() => {
    initScroll();
  }, [initScroll]);

  const prevOption = () => {
    const top = Math.max(
      scrollContainerRef.current!.scrollTop - option_height.current,
      0,
    );
    scrollContainerRef.current!.scrollTo({ top });
  };
  const nextOption = () => {
    const top = scrollContainerRef.current!.scrollTop + option_height.current;
    scrollContainerRef.current!.scrollTo({ top });
  };

  /**
   * call and spread this function on your each option tag to conect them with IntesectionObsever
   */
  const registerEachOption: UseWheelSelectorReturnType["registerEachOption"] = (
    index,
  ) => {
    return {
      ref: (optionEl) => {
        if (!optionEl) return;
        optionRefList.current[index] = optionEl;
      },
    };
  };

  /**
   * call and spread this function on the scroll container parent of option tags because this hook need to access to its scrolling properties by using its ref
   */
  const registerScrollContainer: UseWheelSelectorReturnType["registerScrollContainer"] =
    () => {
      return {
        ref: (_scrollContainerRef) => {
          if (!_scrollContainerRef) return;
          scrollContainerRef.current = _scrollContainerRef;
        },
      };
    };

  return {
    prevOption,
    nextOption,
    registerEachOption,
    registerScrollContainer,
  };
};

export default useWheelSelector;

function calculateRootMargin({
  scroll_container_height,
  option_height,
}: {
  scroll_container_height: number;
  option_height: number;
}) {
  // * (Half of scroll_container_height) - (Half of option_height)
  const MarginY =
    Math.ceil(scroll_container_height / 2) - Math.floor(option_height / 2);
  return `-${MarginY}px 0px -${MarginY}px 0px`;
}
