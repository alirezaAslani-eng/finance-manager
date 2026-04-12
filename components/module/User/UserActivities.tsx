import { Box, BoxProps, Stack, Typography } from "@mui/material";

function UserActivities(props: BoxProps) {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      my={"44px"}
      {...props}
    >
      <Stack alignItems={"center"} gap={"2px"}>
        <Typography>{"42"}</Typography>
        {"تراکنش"}
      </Stack>
      <Stack alignItems={"center"} gap={"2px"}>
        <Typography>{"2"}</Typography>
        {"حساب"}
      </Stack>
      <Stack alignItems={"center"} gap={"2px"}>
        <Typography>{"25"}</Typography>
        {"دسته بندی"}
      </Stack>
    </Box>
  );
}

export default UserActivities;
