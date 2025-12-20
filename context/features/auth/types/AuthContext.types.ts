import type { CreatedCategoryOutputService } from "@/server/services";
import { GetMeOutput } from "@/types/user.types";
import { JSX, PropsWithChildren } from "react";

interface AuthProvidedValue {
  userInfo: GetMeOutput;
  isLogin: boolean;
  isAuthing: boolean;
  setInfo: (userInfo: Partial<GetMeOutput>) => void;
  refetchMe: () => Promise<void>;
  addCategory: (category: CreatedCategoryOutputService) => void;
  editCategory: (updatedCategory: { newName: string; _id: string }) => void;
}
interface AuthProviderProps {
  // * ssrUserInfo is for info which might be initialized from SSR PAGE
  ssrUserInfo?: GetMeOutput;
}
type AuthProviderType = (
  props: PropsWithChildren<AuthProviderProps>
) => JSX.Element;

export type { AuthProvidedValue, AuthProviderType, AuthProviderProps };
