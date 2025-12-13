import React from "react";
import LandingTopBar from "../LandingTopBar/LandingTopBar";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { HeroDarkIcon, HeroIcon } from "@/assets/svg";
import { useAuth } from "@/context";

function Landing() {
  // * AuthContext to handle ui states ================== >
  const { isLogin } = useAuth();
  const isMedium = useMediaQuery("(min-width:900px)");
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        height: "100svh",
        minHeight: "700px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* TopBar ======================== > */}
      <LandingTopBar />
      {/* Content ============================ > */}
      <Container
        sx={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "200px",
          backdropFilter: "blur(35px)",
        }}
      >
        {/* Right Side =================== > */}
        <Box
          component={"aside"}
          sx={{
            textAlign: {
              xs: "center",
              md: "right",
            },
          }}
        >
          {/* Title */}
          <Typography
            variant="h1"
            component={"h3"}
            sx={{ fontSize: { xs: "30px", sm: "35px" } }}
          >
            {"دیگه فراموش نکن چرا و کی واریزی داشتی یا خرج کردی"}
          </Typography>

          {/* Desc */}
          <Typography
            component={"p"}
            sx={{ fontSize: { xs: "18px", md: "24px" }, mt: "20px" }}
          >
            {"با هزینه یار خیلی اسون و رایگان تراکنش هات را کنترل و مدریت کن"}
          </Typography>

          {/* Signin Button ----- > */}
          <Box sx={{ mt: "35px" }}>
            <Link href={isLogin ? "/my-panel" : "/auth/signin"}>
              <Button size="large" variant="contained">
                {isLogin ? `وارد پنل شوید` : "همین الان شروع کن"}
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Left Side =========================== > */}
        {isMedium && (
          <Box component={"aside"} sx={{ minWidth: "min(250px,100%)" }}>
            {palette.mode == "light" ? <HeroIcon /> : <HeroDarkIcon />}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Landing;
