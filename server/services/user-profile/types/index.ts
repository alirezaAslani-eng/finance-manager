import { InitSchemaType } from "@/lib/validations/initSchema";

interface SetupInfo extends InitSchemaType {
  userID: string;
  bankName: string;
  bankIcon: string;
}
type SetupUser = (setupInfo: SetupInfo) => Promise<void>;

export type { SetupUser };
