import { number, object, string, enum as enum_ } from "zod";

const createTransactionSchema = () => {
  return object({
    amount: number(" ").min(1, " "),
    reason: string(" ").min(3, "حد اقل 3 حرف").max(500, "حد اکثر 500 حرف"),
    type: enum_(["0", "1"]),
    account: string(" ").nonempty(" "),
    category: string(" ").nonempty(" "),
  });
};

export default createTransactionSchema;
