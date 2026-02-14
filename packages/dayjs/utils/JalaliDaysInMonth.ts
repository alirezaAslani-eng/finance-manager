import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { ParamType } from "@/types/utils";
import { buildArray } from "@/lib/utils";
function JalaliDaysInMonth(date: ParamType<typeof dayjs>): number[] {
  dayjs.extend(jalaliday);
  return buildArray(
    dayjs(date, { jalali: true }).calendar("jalali").daysInMonth(),
    (i: number) => i + 1,
  );
}

export default JalaliDaysInMonth;
