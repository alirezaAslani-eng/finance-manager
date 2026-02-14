import { ParamType } from "@/types/utils";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

interface ConvertToGregoryConfig {
  date: ParamType<typeof dayjs>;
}
function convertToGregory({
  date,
}: ConvertToGregoryConfig): ReturnType<typeof dayjs> {
  dayjs.extend(jalaliday);

  // * -------- set default value --------
  if (!date) date = dayjs().calendar("jalali");

  // * -------- convert to gerogy --------
  return dayjs(date, { jalali: true }).calendar("jalali");
}

export default convertToGregory;
