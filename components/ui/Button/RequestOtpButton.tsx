import React from "react";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import { Button, CircularProgress, Typography, useTheme } from "@mui/material";
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
        <Typography component={"span"} fontSize={"20px"}>
          {semanticFormat}
        </Typography>
      ) : (
        <Button
          onClick={onRequest}
          variant="outlined"
          size="medium"
          sx={(tm) => {
            return { ...tm.custom.circleButton };
          }}
        >
          {isRequesting ? (
            <CircularProgress size={20} />
          ) : (
            <RotateLeftRoundedIcon />
          )}
        </Button>
      )}
    </>
  );
}

export default RequestOtpButton;
