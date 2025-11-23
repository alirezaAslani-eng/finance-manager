import { endOfDay } from ".";
import startOfDay from "./startOfDay";

interface Options {
  /**
   * End of The day of your Date
   */
  endOfDaye?: boolean;
  /**
   * Beginnig of The day of your Date
   */
  startOfDay?: boolean;
}
const identifyDate = (
  val: unknown,
  opt: Options = { endOfDaye: false, startOfDay: false }
): Date | null => {
  // * Options =============== >
  const { endOfDaye: isEnd, startOfDay: isStart } = opt;

  if (typeof val === "string" && val.length) {
    // * Check Date ==== >
    const date = new Date(val);
    let identifiedDate: Date | null = isNaN(date.getTime()) ? null : date;
    if (!identifiedDate) return null;
    // * change houre (optional)
    identifiedDate = isStart ? startOfDay(date) : date;
    identifiedDate = isEnd ? endOfDay(date) : date;
    return identifiedDate;
  }
  return null;
};

export default identifyDate;
