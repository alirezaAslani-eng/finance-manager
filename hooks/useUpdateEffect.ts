import React, { DependencyList, useEffect, useRef } from "react";
type CleanUp = () => void | undefined;
type CallBackEffect = () => void | CleanUp;

function useUpdateEffect(effect: CallBackEffect, depsArray: DependencyList) {
  const isFirstMount = useRef<boolean>(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const cleanUp = effect();
    if (cleanUp) return cleanUp;
  }, depsArray);
}

export default useUpdateEffect;
