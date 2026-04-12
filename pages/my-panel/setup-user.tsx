import { Typography, Container, Box, Fade } from "@mui/material";
import { PageComponent } from "@/types/page.types";
import { SetupUserForm } from "@/components/module";
import { ArrowRightAltSharp } from "@mui/icons-material";

const setupUser: PageComponent = () => {
  return (
    <Container>
      {/* Title ================== > */}
      <Typography variant="xl-title" textAlign={"center"} mt={"44px"}>
        قبل از شروع یک حساب و دسته بندی ایجاد کنید
      </Typography>

      {/* Form ======================= > */}
      <Box mx={"auto"} mt={"80px"} maxWidth={"600px"}>
        <SetupUserForm>
          <SetupUserForm.FormContainer />
          <SetupUserForm.SubmitButton sx={{ mt: "24px", gap: "8px" }}>
            <ArrowRightAltSharp />
            {"ادامه"}
          </SetupUserForm.SubmitButton>
        </SetupUserForm>
      </Box>
    </Container>
  );
};

export default setupUser;
