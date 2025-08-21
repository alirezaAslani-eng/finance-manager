import { Account_face } from "@/types/account.types";
import { object, Infer, string } from "zod";

const accountSchema = object({
  cardNumber: string().regex(/^[0-9]{16}$/, "شماره کارت نا معتبر هست"),
  // TODO -> currentBalance must change to number 
  currentBalance: string().regex(/^[0-9]+$/, "مقدار نا معتبر هست"),
});

// * Test Validation =============== >
type Test = Infer<typeof accountSchema> extends Pick<
  Account_face,
  "cardNumber" | "currentBalance"
>
  ? true
  : false;
export default accountSchema;

