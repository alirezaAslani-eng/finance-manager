import { RequestOtpForm } from "@/components/module";
import { Box, Container } from "@mui/material";
import React from "react";

function signin() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100svh",
      }}
    >
      <Container sx={{display:"flex",justifyContent:"center"}}>
        <RequestOtpForm />
      </Container>
    </Box>
  );
}

export default signin;
