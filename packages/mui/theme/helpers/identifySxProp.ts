import { SxProps, Theme } from "@mui/material";

function identifySxProp(tm: Theme, sx: SxProps<Theme> | undefined): object {
  if (sx instanceof Function) return sx(tm) as object;
  else if (sx instanceof Object) return sx as object;
  return {};
}

export default identifySxProp;
