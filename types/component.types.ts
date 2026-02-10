import { FC, MemoExoticComponent } from "react";

interface ComponentFetchState<TData = any> {
  isError?: boolean;
  isPending?: boolean;
  data?: TData;
}

type CompoundComponentsType = {
  [ComponentName: string]:
    | ComponentType<any, any>
    | MemoizedComponentType<any, any>;
};

/**
 * Must be implemented by 'as' :
 * @example
 * const Component = memo(YourComponent) as MemoizedComponentType<PropsType,CompoundComponents>
 */
type MemoizedComponentType<
  TProps = {},
  CompoundComponents extends CompoundComponentsType = {},
> = MemoExoticComponent<FC<TProps>> & {
  [ComponentPropsType in keyof CompoundComponents]: CompoundComponents[ComponentPropsType];
};

/**
 * ### Usage :
 * @example
 * const Component:ComponentType<PropsType,CompoundComponents> = YourComponent
 */
type ComponentType<
  TProps = {},
  CompoundComponents extends CompoundComponentsType = {},
> = FC<TProps> & {
  [ComponentPropsType in keyof CompoundComponents]: CompoundComponents[ComponentPropsType];
};
export type { ComponentFetchState, MemoizedComponentType, ComponentType };
