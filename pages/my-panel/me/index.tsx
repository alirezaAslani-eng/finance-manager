import { UserEditForm } from "@/components/module";
import { UserCircle } from "@/components/ui";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box, Container } from "@mui/material";
import React from "react";

const index: PageComponent = () => {
  return (
    <Container>
      <Box sx={{ pt: "30px" }}>
        {/* User's name Heading Section ==================== > */}
        <UserCircle />
        <Box sx={{ mt: "30px" }}>
          <UserEditForm />
        </Box>
      </Box>
    </Container>
  );
};
index.Layout = PanelLayout;

export default index;
