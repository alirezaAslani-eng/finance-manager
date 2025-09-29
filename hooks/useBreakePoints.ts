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
  return { isTablet };
}

export default useBreakePoints;
