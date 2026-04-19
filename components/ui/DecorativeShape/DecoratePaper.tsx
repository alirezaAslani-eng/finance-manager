import { styled } from "@mui/material";
import { Box } from "@mui/system";

const DecoratePaper = styled(Box)(({ theme }) => ({
  position: "relative",
  "::after": {
    content: `""`,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: -1,
    backgroundColor: theme.palette.primary.main,
    transform: "translate(20%,-40% )",
    aspectRatio: "1/1",
    width: "50px",
    borderRadius: "16px",
    [theme.breakpoints.up("sm")]: {
      transform: "translate(40%,-40% )",
      width: "70px",
      borderRadius: "24px",
    },
  },
}));

export default DecoratePaper;
