// maxWidth="lg" sx={{ px: { xs: "16px", sm: "24px" } }}
import { Theme, Components } from "@mui/material/styles";

const inputLabel = {
  defaultProps: {
    sx: ({ spacing }) => ({
      px: { xs: spacing(4), sm: spacing(6) },
      // pt: { xs: spacing(4), md: spacing(8), lg: spacing(12) },
      width: "100%",
      maxWidth: {
        xs: "100%",
        sm: "600px",
        md: "900px",
        lg: "calc(1200px - 239px)",
        xl: "calc(1536px - 239px)",
      },
    }),
  },
} satisfies Components<Theme>["MuiContainer"];

export default inputLabel;
