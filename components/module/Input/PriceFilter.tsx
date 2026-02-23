import { PriceInput } from "@/components/ui";
import { Box, Stack } from "@mui/material";

type FromOnChange = (val: number) => void;
type ToOnChange = (val: number) => void;
interface myProps {
  fromValue?: number;
  toValue?: number;
  fromOnChange?: FromOnChange;
  toOnChange?: ToOnChange;
}
function PriceFilter({
  fromOnChange,
  toOnChange,
  fromValue,
  toValue,
}: myProps) {
  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"center"}
      gap={"10px"}
      alignItems={"center"}
      width={"100%"}
    >
      {/* From ================= > */}

      <PriceInput
        onChange={fromOnChange}
        value={fromValue}
        placeholder="از مبلغ"
      />

      {/* To ======================= > */}

      <PriceInput onChange={toOnChange} value={toValue} placeholder="تا مبلغ" />
    </Stack>
  );
}

export default PriceFilter;
