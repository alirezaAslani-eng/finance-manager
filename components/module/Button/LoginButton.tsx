import { CircleLoader } from "@/components/ui";
import { useAuth } from "@/context";
import { VerifiedUserOutlined } from "@mui/icons-material";
import { Button, ButtonProps, Fade } from "@mui/material";
import Link from "next/link";

function LoginButton(props: ButtonProps) {
  const { isAuthing, isLogin } = useAuth();

  return (
    <>
      {isAuthing ? (
        <CircleLoader bgcolor={"primary.main"} />
      ) : isLogin ? (
        <Fade in>
          <Link href={"/my-panel"}>
            <VerifiedUserOutlined color="primary" />
          </Link>
        </Fade>
      ) : (
        <Fade in>
          <Link href={"/auth/signin"}>
            <Button variant="text" {...props}>
              {props.children}
            </Button>
          </Link>
        </Fade>
      )}
    </>
  );
}

export default LoginButton;
