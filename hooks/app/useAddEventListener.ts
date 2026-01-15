import React, { DependencyList, RefObject, useEffect, useRef } from "react";

interface Options<
  TEventType extends keyof WindowEventMap,
  TElement extends HTMLElement | Window | null
> {
  el?: TElement;
  type: TEventType;
  listener: (this: TElement, e: WindowEventMap[TEventType]) => void;
}

function useAddEventListener<
  TEventType extends keyof WindowEventMap = any,
  TElement extends HTMLElement | Window | null = Window
>({ el, type, listener }: Options<TEventType, TElement>, deps: DependencyList) {
  useEffect(() => {
    // @ts-ignore
    el ?? window.addEventListener(type, listener);
    return () => {
      if (!el) return;
      // @ts-ignore
      el ?? window.removeEventListener(type, listener);
    };
  }, deps);
}

export default useAddEventListener;
