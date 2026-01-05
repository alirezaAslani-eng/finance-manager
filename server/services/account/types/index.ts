import { account_schema } from "@/server/models";
import { InferSchemaType } from "mongoose";
/**
 * service's options
 */
interface ServiceOptions {
  uniqCheck?: boolean;
}

// * isUniqueCardNumber.ts === >
type IsUniqueCardNumber = (cardNumber: string) => Promise<boolean>;

// * isFirstAccount.ts === >
type IsFirstAccount = (userID: string) => Promise<boolean>;

// * findActiveAccount.ts
interface FindActiveAccountOutput {
  user: string;
  _id: string;
}
type FindActiveAccount = (
  userId: string
) => Promise<FindActiveAccountOutput | null>;

// * activeAccount.ts === >
type ActiveAccount = (userID: string, accountID: string) => Promise<void>;

// * createAccount.ts === >
type AccountMongoSchema = InferSchemaType<typeof account_schema>;
interface CreateAccountInfo extends Omit<AccountMongoSchema, "isActive"> {}
interface CreateAccountOutput extends AccountMongoSchema {}
type CreateAccount = (
  info: CreateAccountInfo,
  options?: Pick<ServiceOptions, "uniqCheck">
) => Promise<CreateAccountOutput>;

// * editAccount.ts === >
interface EditCategoryInfo
  extends Pick<
    AccountMongoSchema,
    "accountName" | "bankIcon" | "bankName" | "cardNumber" | "currentBalance"
  > {}
type EditAccount = (_id: string, body: EditCategoryInfo) => Promise<void>;

// * removeAccount.ts === >
type RemoveAccount = (_id: string) => Promise<void>;

// * getOneAccount === >
interface GetOneAccountOutput
  extends Pick<
    AccountMongoSchema,
    "accountName" | "cardNumber" | "currentBalance"
  > {}
type GetOneAccount = (_id: string) => Promise<GetOneAccountOutput | null>;

export type {
  // * isUniqueCardNumber.ts === >
  IsUniqueCardNumber,
  // * isFirstAccount.ts === >
  IsFirstAccount,
  // * findActiveAccount.ts === >
  FindActiveAccount,
  FindActiveAccountOutput,
  // * activeAccount.ts === >
  ActiveAccount,
  // * createAccount.ts
  CreateAccount,
  CreateAccountOutput,
  // * editCategory.ts
  EditAccount,
  // * removeAccount.ts
  RemoveAccount,
  // * getOneAccount.ts
  GetOneAccountOutput,
  GetOneAccount,
};
