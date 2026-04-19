import { muiTheme } from "@/packages/mui";
import { Box, styled } from "@mui/material";

const BlurPaper = styled(Box)(({ theme: { palette, alpha } }) => ({
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  border: "1px solid",
  borderColor: muiTheme(palette.mode, {
    dark: alpha(palette.white[50]!, 0.12),
    light: alpha(palette.darkBackground, 0.15),
  }),
}));


export default BlurPaper