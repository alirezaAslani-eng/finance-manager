import { CircleLoader } from "@/components/ui";
import { useFormContext } from "react-hook-form";
import { Button, ButtonProps } from "@mui/material";

function SubmitButton(props: ButtonProps) {
  const useFormReturn = useFormContext();

  const isDisableButton =
    props.disabled ||
    useFormReturn?.formState.isSubmitting ||
    !useFormReturn?.formState.isValid ||
    !useFormReturn?.formState.isDirty;

  return (
    <>
      <Button
        size="large"
        variant="outlined"
        type="submit"
        sx={{ mt: "12px" }}
        {...props}
        disabled={isDisableButton}
      >
        {useFormReturn?.formState.isSubmitting ? (
          <CircleLoader bgcolor={"primary.main"} />
        ) : (
          props.children
        )}
      </Button>
    </>
  );
}

export default SubmitButton;
