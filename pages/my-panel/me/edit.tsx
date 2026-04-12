import { UserEditForm } from "@/components/module";
import { FormPanelHeading } from "@/components/ui";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box, Container,  } from "@mui/material";

const edit: PageComponent = function () {
  return (
    <>
      <Container>
        <FormPanelHeading>
          <FormPanelHeading.Title>{"ویرایش"}</FormPanelHeading.Title>
          <FormPanelHeading.BackButton />
        </FormPanelHeading>
        <Box mt={"24px"}>
          <UserEditForm />
        </Box>
      </Container>
    </>
  );
};

edit.Layout = PanelLayout;
export default edit;
