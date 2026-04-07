import {
  Divider,
  Drawer,
  List,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SideBarItems from "./SideBarItems";
import { PowerSettingsNewRounded } from "@mui/icons-material";
import type { DrawerProps } from "@mui/material";


function SideBar(props: DrawerProps) {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      {...props}
      sx={{
        width: "240px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "240px",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", px: "16px" }}
        disableGutters
      >
        <Typography variant="xl" color="primary">
          {"هزینه یار"}
        </Typography>
        <Tooltip title="خروج" placement="left">
          <PowerSettingsNewRounded color="error" />
        </Tooltip>
      </Toolbar>

      <Divider />

      <List>
        <SideBarItems />
      </List>
    </Drawer>
  );
}

export default SideBar;
