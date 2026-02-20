import { buildArray, getJalaliyears } from "@/lib/utils";
import {
  convertToGregory,
  convertToJalali,
  JalaliDaysInMonth,
} from "@/packages/dayjs";
import { useCallback, useMemo, useRef, useState } from "react";
import { identifyJalaliMonth } from "@/lib/utils";
import {
  UseWheelDatePickerConfig,
  UseWheelDatePickerReturn,
  UseWheelDatePickerStateManagerConfig,
  UseWheelDatePickerStateManagerReturn,
} from "./types";

export default function useWheelDatePicker({
  value = new Date(),
  onFinalizeDate = () => {},
}: UseWheelDatePickerConfig = {}): UseWheelDatePickerReturn {
  const {
    days,
    months,
    years,
    selectedDate,
    setDay,
    setMonth,
    setYear,
    finalizeDate,
  } = useWheelDatePickerStateManager({ onFinalizeDate, value });

  const yearOptions = useMemo((): UseWheelDatePickerReturn["years"] => {
    return years.map((year) => ({
      children: year,
      value: year,
    }));
  }, [years]);

  const monthOptions = useMemo((): UseWheelDatePickerReturn["months"] => {
    return months.map((month) => ({
      children: identifyJalaliMonth(month),
      value: month,
    }));
  }, [months, identifyJalaliMonth]);

  const dayOptions = useMemo((): UseWheelDatePickerReturn["days"] => {
    return days.map((day) => ({
      children: day,
      value: day,
    }));
  }, [days]);

  return {
    years: yearOptions,
    months: monthOptions,
    days: dayOptions,
    selectedDate,
    setDay,
    setMonth,
    setYear,
    finalizeDate,
  };
}

// * ---------------- internal-hooks ----------------

function useWheelDatePickerStateManager({
  onFinalizeDate,
  value,
}: UseWheelDatePickerStateManagerConfig): UseWheelDatePickerStateManagerReturn {
  const [months] = useState<number[]>(() => buildArray(12));

  const [years] = useState<number[]>(() => getJalaliyears(1390));

  const [days] = useState<number[]>(() => JalaliDaysInMonth(value));

  const selectedDate = useRef(convertToJalali({ date: value }));

  const setDay = useCallback((jDay: string) => {
    selectedDate.current = selectedDate.current.set("date", Number(jDay));
  }, []);

  const setMonth = useCallback(
    (jMonth: string) => {
      selectedDate.current = selectedDate.current.set("month", Number(jMonth));
    },
    [JalaliDaysInMonth],
  );

  const setYear = useCallback((jYear: string) => {
    selectedDate.current = selectedDate.current.set("year", Number(jYear));
  }, []);

  const finalizeDate = () => {
    onFinalizeDate(convertToGregory({ date: selectedDate.current }).toDate());
  };

  return {
    setDay,
    setYear,
    setMonth,
    days,
    months,
    years,
    finalizeDate,
    selectedDate: selectedDate.current,
  };
}
