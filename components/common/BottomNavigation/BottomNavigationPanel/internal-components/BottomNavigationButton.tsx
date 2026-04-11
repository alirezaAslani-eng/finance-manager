import { muiTheme } from "@/packages/mui";
import { ButtonBase, styled } from "@mui/material";

const BottomNavigationButton = styled(ButtonBase)(({ theme }) => {
  return {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "cente",
    borderRadius: "8px",
    padding: "4px",
    gap: "4px",
    color: muiTheme(theme.palette.mode, {
      light: theme.palette.grey[700],
      dark: theme.palette.grey[300],
    }),
  };
});

export default BottomNavigationButton;
