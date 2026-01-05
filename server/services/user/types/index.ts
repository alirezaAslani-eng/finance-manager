import { user_schema } from "@/server/models";
import { InferSchemaType } from "mongoose";

type UserModelSchema = InferSchemaType<typeof user_schema>;
// * editUserInfo.ts
type EditUserInfo = (
  userID: string,
  newInfo: Pick<UserModelSchema, "email" | "fullName" | "phone" | "userName">
) => Promise<string>; // * string = new token

// * isUniqueUser.ts
type IsUniqueUser = (
  props: Pick<UserModelSchema, "userName" | "phone" | "email">
) => Promise<boolean>;

export type { IsUniqueUser, EditUserInfo };
