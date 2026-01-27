import { createContext, PropsWithChildren, useContext } from "react";

const contextCreator = <TProviderValue= object>() => {

  const Context = createContext({} as TProviderValue);


  const Provider = ({
    value,
    children,
  }: PropsWithChildren<{ value: TProviderValue }>) => {
    return <Context value={value}>{children}</Context>;
  };
  const useCreatedContext = (): TProviderValue => {
    return useContext(Context);
  };

  
  return { Context, Provider, useCreatedContext };
};

export default contextCreator;
