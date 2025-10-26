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
import React, { ReactNode } from "react";

interface MyProps {
  menuItem?: Partial<{ link: string; icon: ReactNode; text: string }>;
  buttonProps?: ListItemButtonProps;
  noLink?: boolean;
}
function SideBarButton({ menuItem, buttonProps, noLink }: MyProps) {
  const { isActive } = useIsActiveLink(menuItem?.link || "");
  // * Style =============== >
  const { palette } = useTheme();
  const textColor = {
    color: muiTheme(palette.mode, {
      dark: isActive ? palette.primary.main : palette.grey[100],
      light: isActive ? palette.primary.main : palette.grey[700],
    }),
  };
  return (
    <>
      {noLink ? (
        <ListItem disablePadding>
          <ListItemButton onClick={buttonProps?.onClick}>
            <Typography sx={{ ...textColor }}>{menuItem?.text}</Typography>
            <ListItemText primary={menuItem?.icon} sx={{ ...textColor }} />
          </ListItemButton>
        </ListItem>
      ) : (
        <Link href={menuItem?.link || ""}>
          <ListItem disablePadding>
            <ListItemButton onClick={buttonProps?.onClick}>
              <Typography sx={{ ...textColor }}>{menuItem?.text}</Typography>
              <ListItemText primary={menuItem?.icon} sx={{ ...textColor }} />
            </ListItemButton>
          </ListItem>
        </Link>
      )}
    </>
  );
}

export default SideBarButton;
