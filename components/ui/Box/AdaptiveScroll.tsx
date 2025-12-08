import { Box, styled } from "@mui/material";
import { CSSProperties } from "@mui/material/styles";

const AdaptiveScroll = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    maxHeight: "200px",
    flexDirection: "column",
    flexWrap: "nowrap",
    [theme.breakpoints.up("_540")]: {
      flexDirection: "row",
      flexWrap: "wrap",
    } as CSSProperties,
    overflowX: "auto",
    overflowY: "auto",
  };
});

export default AdaptiveScroll;
