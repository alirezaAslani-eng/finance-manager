import { RegisterForm } from "@/components/module";
import { Box, Container } from "@mui/material";
import React from "react";

function signup() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100svh",
      }}
    >
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <RegisterForm />
      </Container>
    </Box>
  );
}

export default signup;
