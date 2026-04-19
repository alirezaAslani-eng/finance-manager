import { CircleLoader } from "@/components/ui";
import { useAuth } from "@/context";
import { identifySxProp } from "@/packages/mui";
import { VerifiedUserOutlined } from "@mui/icons-material";
import { Box, Button, ButtonProps, Fade, FadeProps } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

const Animationtimeout: FadeProps["timeout"] = { enter: 500 };
function LoginButton(props: ButtonProps) {
  const { isAuthing, isLogin } = useAuth();

  return (
    <>
      <Link href={isLogin ? "/my-panel" : "/auth/signin"}>
        <Button
          variant="text"
          {...props}
          sx={(tm) => ({
            ...(isLogin ? (tm.custom?.circleButton as object) : {}),
            ...identifySxProp(tm, props.sx),
          })}
        >
          {isAuthing ? (
            <Box>
              <CircleLoader bgcolor={"primary.main"} />
            </Box>
          ) : isLogin ? (
            <Fade in timeout={Animationtimeout}>
              <VerifiedUserOutlined />
            </Fade>
          ) : (
            <Fade in timeout={Animationtimeout}>
              <Box>{props.children}</Box>
            </Fade>
          )}
        </Button>
      </Link>
    </>
  );
}

export default LoginButton;
