import {
  UserAccessiblities,
  UserActivities,
  UserInfoCard,
} from "@/components/module";
import { FormPanelHeading } from "@/components/ui";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box, Container } from "@mui/material";

const index: PageComponent = () => {
  return (
    <Container>
      <Box maxWidth={"600px"} mx={"auto"}>
        <FormPanelHeading>
          <FormPanelHeading.Title>{"تنزیمات"}</FormPanelHeading.Title>
          <FormPanelHeading.BackButton />
        </FormPanelHeading>

        <UserInfoCard />

        <UserActivities />

        <UserAccessiblities />
      </Box>
    </Container>
  );
};
index.Layout = PanelLayout;

export default index;
