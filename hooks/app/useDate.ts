import { getFaDate } from "@/utils";
interface UseDateOutput {
  date: string;
  time: string;
}

type UseDate = (date: Date) => UseDateOutput;
const useDate: UseDate = (date: Date = new Date()) => {
  // * Date validation === >
  if (isNaN(date.getTime())) return { time: "", date: "" };

  //  * Persian Date and Time ============ >>
  const { fa_date, fa_time } = getFaDate(date);

  // * Return === >>>
  return { time: fa_time, date: fa_date };
};

export default useDate;
