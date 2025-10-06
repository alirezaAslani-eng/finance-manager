import React from "react";
import { Typography, useTheme, Container } from "@mui/material";
import { PageComponent } from "@/types/page.types";
import { muiTheme } from "@/utils";
import { InitForm } from "@/components/module";
import { useInitUser } from "@/hooks";

const init: PageComponent = () => {
  // * Use Init User ======================= >
  const { initUser } = useInitUser();
  // * Style ======================= >
  const {
    palette: { mode, grey },
  } = useTheme();
  const TitleColor = muiTheme(mode, {
    dark: grey[50],
    light: grey[800],
  });
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title ================== > */}
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          color: TitleColor,
          animation: "opacity-appear ease 1.2s forwards",
          py: {
            xs: "50px",
            lg: "100px",
          },
          fontSize: {
            xs: "32px",
            md: "46px",
            lg: "54px",
          },
        }}
      >
        قبل از شروع یک حساب و دسته بندی ایجاد کنید
      </Typography>
      {/* Form ======================= > */}

      <InitForm
        onSubmit={initUser}
        formContainerProps={{
          sx: {
            width: "min(100%,500px)",
          },
        }}
      />
    </Container>
  );
};

export default init;
