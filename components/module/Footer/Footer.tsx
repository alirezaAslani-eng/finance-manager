import { Box, Link, useTheme } from "@mui/material";
import React from "react";

function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        textAlign: "center",
        fontFamily: theme.typography.h1,
        fontSize: {xs:"18px",sm:"24px"},
        padding: "10px",
        color: "#fff",
      }}
    >
      ساخته شده توسط :{" "}
      <Link href="https://github.com/alirezaAslani-eng" sx={{ color: "#fff" }}>
        Alireza Aslani
      </Link>
    </Box>
  );
}
export default Footer;
