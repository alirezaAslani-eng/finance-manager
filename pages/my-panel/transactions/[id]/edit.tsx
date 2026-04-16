import { EditTransactionForm } from "@/components/module";
import { FormPanelHeading } from "@/components/ui";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box, Container } from "@mui/material";

const edit: PageComponent = () => {
  return (
    <Container>
      <FormPanelHeading>
        <FormPanelHeading.Title>{"ویرایش تراکنش"}</FormPanelHeading.Title>
        <FormPanelHeading.BackButton />
      </FormPanelHeading>
      <Box maxWidth={"600px"} mx={"auto"}>
        <EditTransactionForm>
          <EditTransactionForm.FormContainer isLatestTransaction />
          <EditTransactionForm.SubmitButton>
            {"ویرایش"}
          </EditTransactionForm.SubmitButton>
        </EditTransactionForm>
      </Box>
    </Container>
  );
};

edit.Layout = PanelLayout;
export default edit;
