import { SetupUserSchemaType } from "@/lib/validations/types";

interface SetupInfo extends SetupUserSchemaType {
  userID: string;
  bankName: string;
  bankIcon: string;
}
type SetupUser = (setupInfo: SetupInfo) => Promise<void>;

export type { SetupUser };
