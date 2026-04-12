import { useControllTheme } from "@/context";
import { ThemeMode } from "@/packages/mui";
import NextStyledLink from "@/packages/mui/styled-components/Link/NextStyledLink";
import {
  DarkModeRounded,
  EditRounded,
  PowerSettingsNewRounded,
  WbSunnyRounded,
} from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Stack,
  StackProps,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Link from "next/link";

const sharedOptionButtonProps = {
  size: "large",
  variant: "outlined",
  fullWidth: true,
  sx: {
    justifyContent: "start",
    gap: "20px",
    fontFamily: "var(--dana-rg)",
  },
} satisfies ButtonProps;

function UserAccessiblities(props: StackProps) {
  const { changeMode, mode } = useControllTheme();
  return (
    <Stack gap={"16px"} {...props}>
      <ToggleButtonGroup
        fullWidth
        value={mode satisfies ThemeMode}
        onChange={changeMode}
      >
        <ToggleButton value={"light" satisfies ThemeMode} color="warning">
          <WbSunnyRounded />
        </ToggleButton>
        <ToggleButton value={"dark" satisfies ThemeMode} color="primary">
          <DarkModeRounded />
        </ToggleButton>
      </ToggleButtonGroup>
      <NextStyledLink href={"/my-panel/me/edit"}>
        <Button {...sharedOptionButtonProps}>
          <EditRounded />
          <Typography fontFamily={"inherit"}>{"ویرایش حساب"}</Typography>
        </Button>
      </NextStyledLink>
      <Button {...sharedOptionButtonProps} color="error">
        <PowerSettingsNewRounded />
        <Typography fontFamily={"inherit"}>{"خروج از حساب"}</Typography>
      </Button>
    </Stack>
  );
}

export default UserAccessiblities;
