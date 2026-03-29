import { useContext } from "react";
import { UseFormContext } from "../UseFormContext";
import { FieldValues, UseFormReturn } from "react-hook-form";

function useFormContext<T extends FieldValues>(): UseFormReturn<T> | undefined {
  return useContext(UseFormContext) as UseFormReturn<T>;
}

export default useFormContext;
