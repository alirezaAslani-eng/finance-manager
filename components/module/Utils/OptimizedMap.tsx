import { FC, memo } from "react";

interface OptimizedMapProps<TItemOfArray = unknown> {
  data?: TItemOfArray[];
  Component: FC;
  injector: (item: TItemOfArray, index: number) => object;
}

const OptimizedMap = function <TItemOfArray = unknown>({
  Component,
  data = [],
  injector,
}: OptimizedMapProps<TItemOfArray>) {
  return data.map((item, index) => {
    return <Component key={crypto.randomUUID()} {...injector(item,index)} />;
  });
};

//@ts-ignore
export default memo(OptimizedMap) as typeof OptimizedMap;
