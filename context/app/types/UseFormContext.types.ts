import { PropsWithChildren } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface UseFormContextProvidedValue extends UseFormReturn<any> {}

interface UseFormProviderProps<
  T extends FieldValues,
> extends PropsWithChildren {
  useFormReturn: UseFormReturn<T>;
}

export type { UseFormContextProvidedValue, UseFormProviderProps };
