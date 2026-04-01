import { CircleLoader } from "@/components/ui";
import { useFormContext } from "react-hook-form";
import { CreateAccountSchemaType } from "@/lib/validations/types";
import { Button, ButtonProps } from "@mui/material";

function SubmitButton(props: ButtonProps) {
  const useFormReturn = useFormContext();

  const isDisabled = props.disabled || useFormReturn?.formState.isSubmitting;
  return (
    <>
      <Button
        size="large"
        variant="outlined"
        type="submit"
        sx={{ mt: "12px" }}
        {...props}
        disabled={isDisabled}
      >
        {isDisabled ? (
          <CircleLoader bgcolor={"primary.main"} />
        ) : (
          props.children
        )}
      </Button>
    </>
  );
}

export default SubmitButton;
