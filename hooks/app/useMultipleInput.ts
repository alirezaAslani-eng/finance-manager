import {
  Attributes,
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";
import useAddEventListener from "./useAddEventListener";
import { triggerRandomID } from "@/lib/utils";
import { TextFieldProps } from "@mui/material";
import { UseMultipleInput } from "./types";


const useMultipleInput: UseMultipleInput = ({ inputCount }) => {
  const [multiInputValues, setMultiInputValues] = useState<string[]>([]);
  const [focusedInputIndex, setFocusedInputIndex] = useState(0);
  /**
   * Switch between prev and next input by its value and current index
   */
  const prevNext = useCallback(
    <TValue = string>(inputVal: TValue, inputIndex: number) => {
      if (inputVal) setFocusedInputIndex(Math.min(inputIndex + 1, inputCount));
      else setFocusedInputIndex(Math.max(inputIndex - 1, 0));
    },
    [setFocusedInputIndex]
  );
  /**
   * This Listener minus the state "focusedInputIndex" only when user press backspace key on an empty input
   */
  useAddEventListener(
    {
      type: "keydown",
      listener(e) {
        if (e.key != "Backspace") return;
        const target = e.target as HTMLInputElement;
        if (target?.role != "single-char-input") return;
        if (target.value) return;
        e.preventDefault(); // * preventd backspace behavior because it applies on prev input
        prevNext("", Number(target.id)); // * only prev of empty input
      },
    },
    [prevNext]
  );

  const updateSingleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = e.target.value;
    setMultiInputValues((prev) => {
      const array = [...prev];
      array[index] = value[0];
      return array;
    });
  };

  const register = (index: number) => {
    return {
      onChange: (e) => {
        updateSingleInput(e, index);
        prevNext(e.target.value, index);
      },
      onFocus: (e) => {
        setFocusedInputIndex(Number(e.target.id));
      },
      value: multiInputValues[index] || "",
      id: String(index),
      role: "single-char-input",
      key: triggerRandomID(focusedInputIndex === index),
      autoFocus: focusedInputIndex === index,
      maxLength: 2,
    } satisfies InputHTMLAttributes<HTMLInputElement> | Attributes;
  };

  const registerMui = (index: number) => {
    return {
      onChange: (e) => {
        updateSingleInput(e, index);
        prevNext(e.target.value, index);
      },
      onFocus: (e) => {
        setFocusedInputIndex(Number(e.target.id));
      },
      value: multiInputValues[index] || "",
      id: String(index),
      key: triggerRandomID(focusedInputIndex === index),
      autoFocus: focusedInputIndex === index,
      slotProps: {
        htmlInput: {
          role: "single-char-input",
          maxLength: 2,
          style: { textAlign: "center", fontSize: "inherit" },
        },
      },
    } satisfies TextFieldProps;
  };

  const setSerializedValue = useCallback(
    (value: string) => {
      const multirized = value.split("").slice(0, inputCount);
      setMultiInputValues(multirized);
    },
    [setMultiInputValues]
  );

  return {
    register,
    registerMui,

    setSerializedValue,

    multiInputValues,
  };
};

export default useMultipleInput;
