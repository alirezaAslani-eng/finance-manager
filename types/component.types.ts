import { FC, MemoExoticComponent, ReactNode } from "react";

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

/**
 * Sometimes we need to wrapp an `<option> element` in a component so this might be a common and simple data structure type for an array
 */
interface OptionTagBasicProps {
  text?: ReactNode;
  value?: string;
}
export type {
  ComponentFetchState,
  MemoizedComponentType,
  ComponentType,
  OptionTagBasicProps,
};
