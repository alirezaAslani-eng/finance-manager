import { Button, ButtonProps } from "@mui/material";
import { useRouter } from "next/navigation";

function BackwardButton(props: ButtonProps) {
  const { back } = useRouter();
  return (
    <Button
      {...props}
      onClick={(e) => {
        props?.onClick && props.onClick(e);
        back();
      }}
    >
      {props.children}
    </Button>
  );
}

export default BackwardButton;
