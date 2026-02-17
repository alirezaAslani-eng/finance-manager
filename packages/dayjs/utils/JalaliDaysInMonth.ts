import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { buildArray } from "@/lib/utils";

function JalaliDaysInMonth(date: Date): number[] {
  dayjs.extend(jalaliday);
  const jalaliDate = dayjs(date).calendar("jalali");

  return buildArray(
    dayjs(`${jalaliDate.year()}/${jalaliDate.month()}/1`, { jalali: true })
      .calendar("jalali")
      .daysInMonth(),
    (i: number) => i + 1,
  );
}

export default JalaliDaysInMonth;
