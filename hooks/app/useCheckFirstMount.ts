import { useEffect, useState } from "react";

interface UseCheckFirstMountConfig {
  firstMountDuration?: number;
}
export default function useCheckFirstMount({
  firstMountDuration = 200,
}: UseCheckFirstMountConfig = {}) {
  const [isFirstMount, setIsFirstMount] = useState(true);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsFirstMount(false);
    }, firstMountDuration);

    return () => {
      clearTimeout(timeOut);
    };
  }, [firstMountDuration, setIsFirstMount]);
  return { isFirstMount };
}
