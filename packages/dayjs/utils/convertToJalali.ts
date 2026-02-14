import { ParamType } from "@/types/utils";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

interface ConvertToJalaliConfig {
  date: ParamType<typeof dayjs>;
}
function convertToJalali({
  date = new Date(),
}: ConvertToJalaliConfig): ReturnType<typeof dayjs> {
  dayjs.extend(jalaliday);
  return dayjs(date).calendar("jalali");
}

export default convertToJalali;
