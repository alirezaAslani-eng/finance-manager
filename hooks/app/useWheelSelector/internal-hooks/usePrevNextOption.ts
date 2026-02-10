import { useCallback } from "react";
import { BaseInternalHooksProps } from "./types";

interface UsePrevNextEventsProps extends Pick<
  BaseInternalHooksProps,
  "scrollContainerRef" | "option_height"
> {}
export default function usePrevNextOption({
  option_height,
  scrollContainerRef,
}: UsePrevNextEventsProps) {
  const prevOption = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const top = Math.max(
      scrollContainerRef.current.scrollTop - option_height,
      0,
    );
    scrollContainerRef.current.scrollTo({ top });
  }, [option_height]);
  const nextOption = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const top = scrollContainerRef.current.scrollTop + option_height;
    scrollContainerRef.current!.scrollTo({ top });
  }, [option_height]);

  return { prevOption, nextOption };
}
