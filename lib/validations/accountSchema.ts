import { Account_face } from "@/types/account.types";
import { object, Infer, string, number } from "zod";

const accountSchema = object({
  cardNumber: string().regex(/^[0-9]{16}$/, "شماره کارت نا معتبر هست"),
  currentBalance: number().min(0, "مقدار حداقل 0 میتونه باشه"),
});

// * Test Validation =============== >
type Test = Infer<typeof accountSchema> extends Pick<
  Account_face,
  "cardNumber" | "currentBalance"
>
  ? true
  : false;
export default accountSchema;

