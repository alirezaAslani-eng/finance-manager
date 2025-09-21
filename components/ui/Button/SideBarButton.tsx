import type { MenuItemFace } from "@/constant/staticData/types/menuList.types";
import { muiTheme } from "@/utils";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React from "react";

function SideBarButton({ menuItem }: { menuItem: MenuItemFace }) {
  const { palette } = useTheme();
  const textColor = {
    color: muiTheme(palette.mode, {
      dark: palette.primary.main,
      light: palette.grey[800],
    }),
  };
  return (
    <Link href={menuItem.link}>
      <ListItem key={menuItem.id} disablePadding>
        <ListItemButton>
          <Typography sx={{ ...textColor }}>{menuItem.text}</Typography>
          <ListItemText primary={menuItem.icon} sx={{ ...textColor }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default SideBarButton;
