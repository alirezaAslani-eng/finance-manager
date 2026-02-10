import { isValidElement } from "@/utils";
import React, { DependencyList, RefObject, useEffect, useRef } from "react";

interface Options<
  TEventType extends keyof WindowEventMap,
  TElement extends HTMLElement | Window | null,
> {
  el: TElement;
  type: TEventType;
  listener: (this: TElement, e: WindowEventMap[TEventType]) => void;
}

function useAddEventListener<
  TEventType extends keyof WindowEventMap = any,
  TElement extends HTMLElement | Window | null = Window,
>(
  { el, type, listener }: Options<TEventType, TElement>,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const Element = isValidElement(el);
    if (!Element) return;
    // @ts-ignore
    Element.addEventListener(type, listener);
    return () => {
      const Element = isValidElement(el);
      if (!Element) return;
      // @ts-ignore
      Element.removeEventListener(type, listener);
    };
  }, deps);
}

export default useAddEventListener;
