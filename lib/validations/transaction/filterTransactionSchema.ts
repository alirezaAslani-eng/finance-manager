import { identifyDate } from "@/lib/utils";
import {
  array,
  number,
  object,
  preprocess,
  string,
  enum as enum_,
  date,
  literal,
} from "zod";

const filterTransactionSchema = () => {
  return object({
    accounts: array(string()),
    categories: array(string()),
    fromDate: preprocess((val) => identifyDate(val), date().nullable()),
    toDate: preprocess((val) => identifyDate(val), date().nullable()),
    maxAmount: number().nullable(),
    minAmount: number().nullable(),
    type: enum_(["0", "1"]).nullable(),
    old: literal(true).nullable(),
  });
};

export default filterTransactionSchema;
