import type { MenuItemFace } from "@/constant/staticData/types/menuList.types";
import { muiTheme } from "@/utils";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function SideBarButton({ menuItem }: { menuItem: MenuItemFace }) {
  const { pathname } = useRouter();
  // * Style =============== >
  const isActive = menuItem.link == pathname;
  const { palette } = useTheme();
  const textColor = {
    color: muiTheme(palette.mode, {
      dark: isActive ? palette.primary.main : palette.grey[100],
      light: isActive ? palette.primary.main : palette.grey[700],
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
