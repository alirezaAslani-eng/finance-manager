import { useRef } from "react";
import {
  UseIgnoreFirstCallsConfig,
  UseIgnoreFirstCallsReturn,
  WrappedFunc,
} from "./types";

function useIgnoreFirstCalls<
  TFunc extends (args: any) => any = (args: any) => any,
>({
  func,
  ignoredTimes = 1,
}: UseIgnoreFirstCallsConfig<TFunc>): UseIgnoreFirstCallsReturn<TFunc> {
  const Reamining = useRef<number>(ignoredTimes);

  const isIgnoringFinished = (): boolean => {
    if (Reamining.current <= 0) return true;
    Reamining.current -= 1;
    return false;
  };

  const ignoredCallsFunc: WrappedFunc<TFunc> = (params) => {
    if (!isIgnoringFinished()) return;
    return func(params);
  };
  return {
    func: ignoredCallsFunc,
  };
}

export default useIgnoreFirstCalls;


