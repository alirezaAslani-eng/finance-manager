import { startOfDay } from "@/lib/utils";
import { createParser } from "nuqs";

/**
 * A nuqs parser that keep the Date in URL as ISO start of day and provide it as a Date value
 */
const parseAsFromDate = createParser<Date | null>({
  parse: (q) => {
    const date = new Date(q);
    const isInValidDate = isNaN(date.getTime());
    if (isInValidDate) return null;
    return startOfDay(date);
  },
  serialize: (value) => {
    if (!value) return "";
    return startOfDay(value).toISOString();
  },
});

export default parseAsFromDate;
