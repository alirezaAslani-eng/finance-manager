import type { MenuItemFace } from "@/constant/staticData/types/menuList.types";
import { useIsActiveLink } from "@/hooks";
import { muiTheme } from "@/utils";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import type { ListItemButtonProps } from "@mui/material";
import Link from "next/link";
import React from "react";

interface MyProps {
  menuItem: MenuItemFace;
  buttonProps?: ListItemButtonProps;
}
function SideBarButton({ menuItem, buttonProps }: MyProps) {
  const { isActive } = useIsActiveLink(menuItem.link);
  // * Style =============== >
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
        <ListItemButton onClick={buttonProps?.onClick}>
          <Typography sx={{ ...textColor }}>{menuItem.text}</Typography>
          <ListItemText primary={menuItem.icon} sx={{ ...textColor }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default SideBarButton;
