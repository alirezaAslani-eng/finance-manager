import {  Toolbar, Typography } from "@mui/material";
import { muiTheme } from "@/packages/mui";
import { getFaDate } from "@/lib/utils";

function PanelAppBar() {
  return (
    <Toolbar
      sx={({ palette, alpha }) => {
        return {
          justifyContent: "center",
          width: "100%",
          borderBottom: "1px solid",
          borderColor: muiTheme(palette.mode, {
            light: alpha(palette.black, 0.12),
            dark: alpha(palette.white, 0.12),
          }),
        };
      }}
    >
      <Typography fontFamily={"var(--dana-rg)"}>
        {getFaDate(new Date()).fa_date}
      </Typography>
    </Toolbar>
  );
}

export default PanelAppBar;
