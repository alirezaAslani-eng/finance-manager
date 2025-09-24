import { Box, BoxProps, Typography } from "@mui/material";
import DatePicker, { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import React, { useEffect, useState } from "react";
import type { Value } from "react-multi-date-picker";
import { DateField, MuiButton } from "@/components/ui";

interface OnFilterProps {
  date: {
    from: Date;
    to: Date;
  };
}
interface myProps {
  containerProps?: BoxProps;
  onFilter?: (date: OnFilterProps) => any;
}
function Datefilter({ containerProps, onFilter = () => {} }: myProps) {
  const now = new Date();
  const afterNow = new Date(now);
  afterNow.setDate(afterNow.getDate() + 30);
  const [fromDate, setFromDate] = useState<Date>(now);
  const [toDate, setToDate] = useState<Date>(afterNow);

  const to_Date = ({ date }: { date: Date }) => {
    setToDate(date);
  };
  const from_Date = ({ date }: { date: Date }) => {
    setFromDate(date);
  };

  return (
    <Box {...containerProps}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Start Date ==================== > */}
        <DateField placeholder="از تاریخ : " onChange={from_Date} />
        {/* End Date ==================== > */}
        <DateField
          placeholder="تا تاریخ : "
          onChange={to_Date}
          defaultValue={toDate}
        />
      </Box>
    </Box>
  );
}

export default Datefilter;
