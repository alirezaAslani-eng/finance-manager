import { CreateTransactionForm } from "@/components/module";
import { FormPanelHeading } from "@/components/ui";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Container } from "@mui/material";

const add: PageComponent = () => {
  return (
    <Container maxWidth="sm" sx={{ maxWidth: undefined }}>
      <FormPanelHeading>
        <FormPanelHeading.Title>{"تراکنش جدید"}</FormPanelHeading.Title>
        <FormPanelHeading.BackButton />
      </FormPanelHeading>

      <CreateTransactionForm>
        <CreateTransactionForm.FormContainer />
        <CreateTransactionForm.SubmitButton>
          {"ایجاد تراکنش"}
        </CreateTransactionForm.SubmitButton>
      </CreateTransactionForm>
    </Container>
  );
};
add.Layout = PanelLayout;
export default add;
