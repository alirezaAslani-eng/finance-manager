import { Dispatch, useEffect, useState } from "react";

export default function useResponsiveState<S = unknown>(
  initialState: S | (() => S),
  responsiveValue: S,
): [S, Dispatch<S>] {
  const [value, setValue] = useState<S>(initialState);

  useEffect(() => {
    setValue(responsiveValue);
  }, [responsiveValue, setValue]);

  return [value, setValue];
}
