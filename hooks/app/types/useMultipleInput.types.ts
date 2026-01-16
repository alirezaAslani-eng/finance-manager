import { TextFieldProps } from "@mui/material";
import { InputHTMLAttributes } from "react";

interface Config {
  inputCount: number;
  onComplete?: (value: string) => void;
}
type UseMultipleInput = (config: Config) => UseMultipleInputOutput;

interface UseMultipleInputOutput {
  /**
   * Register inputs by passing the indexs regulary from 0  :
   * <input {...register(0)} />
   * <input {...register(1)} />
   * <input {...register(2)} />
   */
  register: (index: number) => InputHTMLAttributes<HTMLInputElement>;
  /**
   * Register inputs by passing the indexs regulary from 0  :
   * <TextField {...register(0)} />
   * <TextField {...register(1)} />
   * <TextField {...register(2)} />
   */
  registerMui: (index: number) => TextFieldProps;
  /**
   * if you call this function the state of multiple inputs updates for each inputs
   * @example
   * setSerializedValue("1234")
   * setMultiInputValues(["1","2","3","4"])
   */
  setSerializedValue: (value: string) => void;
  /**
   * It must be passed to the key prop of your input and takes the index, because when user types or press backspace button,
   * the previous or next input remounts by its key in order to make autoFoucus works
   */
  getKey: (index: number) => string;
  /**
   * Each value of these inputs as an Array
   */
  multiInputValues: string[];
}

export type { UseMultipleInput, UseMultipleInputOutput };
