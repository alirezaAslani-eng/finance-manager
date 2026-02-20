import { useCallback, useState } from "react";

/**
 * @example
 *  const [isOpenMenu,openMenu,closeMenu] = useTriggerState(false)
 */
export default function useTriggerState(
  initialState: boolean = false,
): [boolean, () => void, () => void] {
  const [is, setIs] = useState<boolean>(initialState);

  const turnFalse = useCallback(() => {
    setIs(false);
  }, [setIs]);

  const turnTrue = useCallback(() => {
    setIs(true);
  }, [setIs]);

  return [is, turnTrue, turnFalse];
}
