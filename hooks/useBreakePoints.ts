import { breakepoints } from "@/constant";
import { useMediaQuery } from "@mui/material";

interface Option {
  increase?: number;
  decrease?: number;
}
function useBreakePoints(option: Option = {}) {
  const { decrease = 0, increase = 0 } = option!;
  const isTablet = useMediaQuery(
    `(min-width:${breakepoints.md + increase - decrease}px)`
  );
  const is_after_600 = useMediaQuery(
    `(min-width:${breakepoints.sm + increase - decrease}px)`
  );
  return { isTablet , is_after_600 };
}

export default useBreakePoints;
