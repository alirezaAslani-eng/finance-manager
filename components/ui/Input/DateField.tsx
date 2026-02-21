import { Box, Button, Dialog, TextField, TextFieldProps } from "@mui/material";
import { WheelDatePicker } from "@/components/module";
import dana_md from "@/constant/font/dana_md";
import { getFaDate } from "@/lib/utils";
import { useResponsiveState, useTriggerState } from "@/hooks";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { muiTheme } from "@/packages/mui";

// * -------------- TextFeild Props --------------
const texFieldInputProps: TextFieldProps["inputProps"] = {
  readOnly: true,
  style: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingLeft: "40px",
    textAlign: "right",
  },
};

interface myProps {
  onChange?: (date: Date) => any;
  onClear?: () => void;
  value?: Date;
  inputProps?: Omit<TextFieldProps, "onChange" | "value">;
}
const DateField = ({
  onChange = () => {},
  onClear = () => {},
  value,
  inputProps,
}: myProps) => {
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
      <Box position={"relative"}>
        <TextField
          inputProps={texFieldInputProps}
          label={inputProps?.placeholder}
          {...inputProps}
          value={date ? getFaDate(date).fa_date : ""}
          onClick={openDatePickr}
          focused={false}
        />

        <Box
          position={"absolute"}
          left={"1px"}
          borderRadius={"30px 0px 0px 30px"}
          height={"calc(100% - 10px)"}
          top={"50%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={() => {
            return {
              transform: "translateY(-50%)",
            };
          }}
        >
          {!!date ? (
            <Button
              size="small"
              variant="text-grey"
              onClick={onClear}
              sx={(tm) => ({
                ml: "4px",
                ...(tm.custom!.circleButton as object),
              })}
            >
              <ClearRoundedIcon />
            </Button>
          ) : (
            <CalendarMonthRoundedIcon
              sx={({ palette }) => ({
                ml: "8px",
                color: muiTheme(palette.mode, {
                  light: palette.grey[600],
                  dark: palette.grey[400],
                }),
              })}
            />
          )}
        </Box>
      </Box>
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
