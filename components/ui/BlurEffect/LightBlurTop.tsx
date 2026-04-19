import { alpha, Box, styled } from "@mui/material";

const LightBlurTop = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "80px",
  transform: "translateY(-130%)",
  position: "absolute",
  top: 0,
  right: 0,
  backgroundColor: alpha(
    theme.palette.primary.main,
    theme.palette.mode === "light" ? 1 : 0.6,
  ),
  filter: "blur(80px)",
}));

export default LightBlurTop;
