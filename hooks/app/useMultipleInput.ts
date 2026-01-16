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
import useUpdateEffect from "./useUpdateEffect";

const useMultipleInput: UseMultipleInput = ({
  inputCount,
  onComplete = () => {},
  onChange = () => {},
}) => {
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
   * When user fills all inputs, it calls the onComplete function
   */
  const completeHandler = (multiInputValues: string[]) => {
    const serilizedValue = multiInputValues.join("");
    if (serilizedValue.length !== inputCount) return;
    onComplete(serilizedValue);
  };
  /**
   * When user updates inputs, it calls the onChange function
   */
  const changeHandler = (multiInputValues: string[]) => {
    const serilizedValue = multiInputValues.join("");
    onChange(serilizedValue);
  };
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
  /**
   * While user types, this function updates each index of multiInputValues
   */
  const updateSingleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = e.target.value;
    setMultiInputValues((prev) => {
      const array = [...prev];
      array[index] = value[0]?.trim();
      completeHandler(array);
      changeHandler(array);
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

  const getKey = (index: number): string => {
    return triggerRandomID(index === focusedInputIndex);
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
    getKey,
    setSerializedValue,
    multiInputValues,
  };
};

export default useMultipleInput;
