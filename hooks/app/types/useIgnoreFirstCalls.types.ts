import { ParamType } from "@/types/utils";

interface UseIgnoreFirstCallsConfig<
  TFunc extends (args: any) => any = (args: any) => any,
> {
  func: TFunc;
  ignoredTimes?: number;
}
interface UseIgnoreFirstCallsReturn<
  TFunc extends (args: any) => any = (args: any) => any,
> {
  func: WrappedFunc<TFunc>;
}

type WrappedFunc<TOriginalFunc extends (args: any) => any> = (
  param: ParamType<TOriginalFunc>,
) => ReturnType<TOriginalFunc> | undefined;

export type {
  UseIgnoreFirstCallsConfig,
  UseIgnoreFirstCallsReturn,
  WrappedFunc,
};
