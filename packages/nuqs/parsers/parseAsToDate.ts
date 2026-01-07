import { endOfDay } from "@/lib/utils";
import { createParser } from "nuqs";

/**
 * A nuqs parser that keep the Date in URL as ISO end of day and provide it as a Date value
 */
const parseAsToDate = createParser<Date | null>({
  parse: (q) => {
    const date = new Date(q);
    const isInValidDate = isNaN(date.getTime());
    if (isInValidDate) return null;
    return endOfDay(date);
  },
  serialize: (value) => {
    if (!value) return "";
    return endOfDay(value).toISOString();
  },
});

export default parseAsToDate;
