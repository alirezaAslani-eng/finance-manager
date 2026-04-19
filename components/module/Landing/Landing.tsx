import { ThemeButton } from "@/components/ui";
import { muiTheme } from "@/packages/mui";
import LoginButton from "../Button/LoginButton";
import { LoginRounded } from "@mui/icons-material";
import { landingContent } from "@/constant";
import {
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  TypographyProps,
} from "@mui/material";

const typographyShared_sx = (({ palette }) => ({
  color: muiTheme(palette.mode, {
    light: palette.grey[800],
    dark: palette.grey[50],
  }),
})) satisfies TypographyProps["sx"];

function Landing() {
  return (
    <Container>
      <Stack height={"100svh"} minHeight={"700px"} pt={"14px"}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box flex={1} display={"flex"} justifyContent={"start"}>
            <LoginButton sx={{ gap: "8px" }}>
              <LoginRounded />
              {"ورود"}
            </LoginButton>
          </Box>
          <Box flex={1} display={"flex"} justifyContent={"center"}>
            <Typography
              fontSize={{ xs: "20px", sm: "26px" }}
              fontFamily={"var(--peyda-md)"}
              sx={typographyShared_sx}
            >
              {"هزینه یار"}
            </Typography>
          </Box>
          <Box flex={1} display={"flex"} justifyContent={"end"}>
            <ThemeButton />
          </Box>
        </Toolbar>

        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          spacing={8}
          flex={1}
        >
          <Typography
            fontSize={{ xs: "26px", sm: "34px", md: "44px" }}
            textAlign={"center"}
            fontFamily={"var(--peyda-bold)"}
            sx={typographyShared_sx}
          >
            {landingContent.title}
          </Typography>
          <Button size="large" variant="contained">
            {landingContent.callToActionButtonContent}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Landing;
