import { Box, Dialog, TextField, TextFieldProps } from "@mui/material";
import { WheelDatePicker } from "@/components/module";
import dana_md from "@/constant/font/dana_md";
import { getFaDate } from "@/lib/utils";
import { useResponsiveState, useTriggerState } from "@/hooks";

interface myProps {
  onChange?: (date: Date) => any;
  value?: Date;
  inputProps?: Omit<TextFieldProps, "onChange" | "value">;
}
const DateField = ({ onChange = () => {}, value, inputProps }: myProps) => {
  const [isOpenDatePicker, openDatePickr, closeDatePicker] = useTriggerState();

  const [date, setDate] = useResponsiveState<null | Date>(null, value ?? null);

  const finalizeDate = (value: Date) => {
    closeDatePicker();
    setDate(value);
    onChange(value);
  };

  return (
    <>
      {/* // * this text field only shows the selected date */}
      <TextField
        inputProps={{ readOnly: true }}
        label={inputProps?.placeholder}
        {...inputProps}
        value={date ? getFaDate(date).fa_date : ""}
        onClick={openDatePickr}
        focused={false}
      />
      <Dialog
        open={isOpenDatePicker}
        className={dana_md.className}
        onClose={closeDatePicker}
        fullWidth
        maxWidth="xs"
      >
        <Box padding={"24px 16px"}>
          <WheelDatePicker
            onFinalizeDate={finalizeDate}
            value={date ?? undefined}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default DateField;
