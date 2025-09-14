import React, { useState } from "react";
import MuiButton from "./MuiButton";
import MuiProgress from "../Loader/MuiProgress";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import { Typography, useTheme } from "@mui/material";
import { useReamingTime } from "@/hooks";

interface myProps {
  futureMsTime: number;
  isRequesting: boolean;
  onRequest: () => void;
}
function RequestOtpButton({ onRequest, isRequesting, futureMsTime }: myProps) {
  const { isFnished, semanticFormat } = useReamingTime(futureMsTime);

  const { palette } = useTheme();
  return (
    <>
      {!isFnished ? (
        <Typography
          component={"span"}
          sx={{ fontSize: "20px", color: palette.primary.main }}
        >
          {semanticFormat}
        </Typography>
      ) : (
        <MuiButton
          buttonProps={{
            onClick: onRequest,
            variant: "outlined",
            sx: {
              fontSize: "18px",
              minHeight: "0",
              minWidth: "0",
              padding: "10px",
              borderRadius: "999px",
            },
          }}
        >
          {isRequesting ? (
            <MuiProgress progressProps={{ size: 20 }} />
          ) : (
            <RotateLeftRoundedIcon />
          )}
        </MuiButton>
      )}
    </>
  );
}

export default RequestOtpButton;
