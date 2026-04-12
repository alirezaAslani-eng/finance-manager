import { EditAccountForm } from "@/components/module";
import { FormPanelHeading } from "@/components/ui";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { EditRounded } from "@mui/icons-material";
import { Box, Container } from "@mui/material";

const edit: PageComponent = () => {
  return (
    <Container>
      <FormPanelHeading>
        <FormPanelHeading.Title>{"ویرایش حساب"}</FormPanelHeading.Title>
        <FormPanelHeading.BackButton />
      </FormPanelHeading>
      <Box maxWidth={"600px"} mx={"auto"}>
        <EditAccountForm accountId="123">
          <EditAccountForm.FormContainer />
          <EditAccountForm.SubmitButton sx={{ gap: "8px", mt: "24px" }}>
            <EditRounded />
            {"ویرایش حساب"}
          </EditAccountForm.SubmitButton>
        </EditAccountForm>
      </Box>
    </Container>
  );
};

edit.Layout = PanelLayout;
export default edit;
