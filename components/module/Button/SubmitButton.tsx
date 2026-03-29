import { CircleLoader } from "@/components/ui";
import { useFormContext } from "@/context";
import { CreateAccountSchemaType } from "@/lib/validations/types";
import { Button, ButtonProps } from "@mui/material";

function SubmitButton(props: ButtonProps) {
  const useFormReturn = useFormContext<CreateAccountSchemaType>();

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
