import { Box, BoxProps } from "@mui/material";
import { DateField } from "@/components/ui";

interface myProps {
  containerProps?: BoxProps;
  fromOnchange?: (date: Date) => void;
  toOnchange?: (date: Date) => void;
  fromDateVal?: Date | null;
  toDateVal?: Date | null;
}
function Datefilter({
  containerProps,
  fromOnchange,
  toOnchange,
  fromDateVal,
  toDateVal,
}: myProps) {
  const to_Date = (date: Date) => {
    toOnchange && toOnchange(date);
  };
  const from_Date = (date: Date) => {
    fromOnchange && fromOnchange(date);
  };
  return (
    <Box {...containerProps}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Start Date ==================== > */}
        <DateField
          placeholder="از تاریخ : "
          onChange={from_Date}
          // * undefined = default date value
          value={fromDateVal ?? undefined}
        />
        {/* End Date ==================== > */}
        <DateField
          placeholder="تا تاریخ : "
          onChange={to_Date}
          // * undefined = default date value
          value={toDateVal ?? undefined}
        />
      </Box>
    </Box>
  );
}

export default Datefilter;
