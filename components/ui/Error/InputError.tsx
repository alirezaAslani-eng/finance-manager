import { Fade, Typography, TypographyProps } from "@mui/material";
import React from "react";
interface InputErrorProps {
  errorText: string | undefined;
  typographyProps?: Omit<TypographyProps, "children">;
}
function InputError({ errorText, typographyProps = {} }: InputErrorProps) {
  return (
    <Fade in={!!errorText}>
      <Typography
        variant="sm"
        component={"span"}
        color="error"
        {...typographyProps}
      >
        {errorText}
      </Typography>
    </Fade>
  );
}

export default InputError;
