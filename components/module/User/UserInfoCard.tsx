import { muiTheme } from "@/packages/mui";
import { Box, BoxProps, Stack, Typography } from "@mui/material";

function UserInfoCard(props: BoxProps) {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={"8px 12px"}
      bgcolor={"background.paper"}
      borderRadius={"12px"}
      border={"1px solid"}
      sx={({ palette, alpha }) => {
        return {
          borderColor: muiTheme(palette.mode, {
            dark: alpha(palette.white, 0.12),
            light: alpha(palette.black, 0.12),
          }),
        };
      }}
      {...props}
    >
      <Stack gap={"4px"}>
        <Typography variant="lg">{"علیرضا اصلانی"}</Typography>
        <Typography
          variant="sm"
          sx={({ palette }) => ({
            color: muiTheme(palette.mode, {
              light: palette.grey[600],
              dark: palette.grey[300],
            }),
          })}
        >
          {"alirezadev123"}
        </Typography>
      </Stack>

      <Typography
        variant="base"
        sx={({ palette }) => ({
          color: muiTheme(palette.mode, {
            light: palette.grey[600],
            dark: palette.grey[300],
          }),
        })}
      >
        {"09216996841"}
      </Typography>
    </Box>
  );
}

export default UserInfoCard;
