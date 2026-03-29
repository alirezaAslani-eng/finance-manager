import { contextCreator } from "@/utils";
import { UseFormContextProvidedValue, UseFormProviderProps } from "./types";
import { FieldValues } from "react-hook-form";

const { Context } = contextCreator<UseFormContextProvidedValue>();
function UseFormProvider<TFormReturn extends FieldValues = FieldValues>({
  useFormReturn,
  children,
}: UseFormProviderProps<TFormReturn>) {
  return <Context value={{ ...useFormReturn }}>{children}</Context>;
}

export { UseFormProvider, Context as UseFormContext };
