import { Box, useTheme } from "@mui/material";
import React from "react";
import MuiButton from "../Button/MuiButton";
import { muiTheme } from "@/utils";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
interface MyProps {
  text?: string;
  onRemove?: () => void;
}
function DeletableChip({ onRemove, text }: MyProps) {
  const theme = useTheme();
  const {
    palette: { mode, grey },
  } = theme;
  return (
    <Box
      sx={{
        padding: "8px 12px",
        borderRadius: "999px",
        display: "flex",
        alignItems: "center",
        flexShrink: "0",
        gap: "5px",
        width:"fit-content",
        color: muiTheme(mode, {
          light: grey[900],
          dark: grey[200],
        }),
        backgroundColor: muiTheme(mode, {
          light: grey[200],
          dark: grey[700],
        }),
      }}
    >
      {text}
      <MuiButton
        buttonProps={{
          onClick: onRemove,
          color: "error",
          variant: "text",
          sx: {
            ...theme.custom.resetButton,
            borderRadius: "999px",
          },
        }}
      >
        <DeleteOutlineIcon />
      </MuiButton>
    </Box>
  );
}

export default DeletableChip;
