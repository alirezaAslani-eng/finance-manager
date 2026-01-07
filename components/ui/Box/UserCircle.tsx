import { Box, Typography, useTheme } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { muiTheme } from "@/packages/mui";

interface MyProps {
  userName?: string;
}
function UserCircle({ userName = "نام کاربری" }: MyProps) {
  const { palette, alpha } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "fit-content",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          aspectRatio: "1/1",
          height: "200px",
          backgroundColor: palette.primary.main,
          borderRadius: "999px",
          boxShadow: `0px 0px 120px 20px ${alpha(palette.primary.main, 0.4)}`,
          animation: "opacity-appear ease 2s forwards",
        }}
      >
        {/* User Icon ================== > */}
        <AccountCircleIcon
          sx={{ color: palette.grey[50], width: "100%", height: "100%" }}
        />
      </Box>
      {/* Username ==================== > */}
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          mt: "15px",
          fontSize: "24px",
          animation: "fade-down 1s ease forwards",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          color: muiTheme(palette.mode, {
            light: palette.grey[800],
            dark: palette.grey[100],
          }),
        }}
      >
        {userName}
        <Typography
          sx={{ animation: "fade-left 1.5s forwards", fontSize: "30px" }}
        >
          &#128075;
        </Typography>
      </Typography>
    </Box>
  );
}

export default UserCircle;
