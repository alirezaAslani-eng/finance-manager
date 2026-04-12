import { EditAccountForm } from "@/components/module";
import { FormPanelHeading } from "@/components/ui";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Container } from "@mui/material";

const edit: PageComponent = () => {
  return (
    <Container>
      <FormPanelHeading>
        <FormPanelHeading.Title>{"ویرایش حساب"}</FormPanelHeading.Title>
        <FormPanelHeading.BackButton />
      </FormPanelHeading>
      <EditAccountForm />
    </Container>
  );
};

edit.Layout = PanelLayout;
export default edit;
