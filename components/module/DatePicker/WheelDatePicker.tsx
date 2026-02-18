import { WheelSelector } from "@/components/ui";
import { Box, Button } from "@mui/material";
import { useWheelDatePicker } from "@/hooks";
import { WheelDatePickerProps } from "@/components/module/types";

function WheelDatePicker({ onChange, value }: WheelDatePickerProps) {
  const wheelDatePicker = useWheelDatePicker({
    value,
    onChange,
  });

  return (
    <Box>
      <Box width={"100%"} display={"flex"} alignItems={"center"} gap={"12px"}>
        <Box flex={1}>
          <WheelSelector
            options={wheelDatePicker.days}
            onChangeOption={wheelDatePicker.setDay}
            selctedOption={wheelDatePicker.selectedDate.date().toString()}
          />
        </Box>
        <Box flex={1}>
          <WheelSelector
            options={wheelDatePicker.months}
            onChangeOption={wheelDatePicker.setMonth}
            selctedOption={wheelDatePicker.selectedDate.month().toString()}
          />
        </Box>
        <Box flex={1}>
          <WheelSelector
            options={wheelDatePicker.years}
            onChangeOption={wheelDatePicker.setYear}
            selctedOption={wheelDatePicker.selectedDate.year().toString()}
          />
        </Box>
      </Box>
      <Button onClick={wheelDatePicker.finalizeDate}>Finalize date</Button>
    </Box>
  );
}

export default WheelDatePicker;
