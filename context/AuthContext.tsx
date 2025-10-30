import { getUserInfo } from "@/api/get";
import { keys } from "@/config/react-query";
import { CreatedCategoryReturnService } from "@/lib/services/types/services.types";
import { GetMeOutput } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

interface Provider {
  userInfo: GetMeOutput;
  isLogin: boolean;
  setInfo: (userInfo: Partial<GetMeOutput>) => void;
  refetchMe: () => Promise<void>;
  addCategory: (category: CreatedCategoryReturnService) => void;
}
interface AuthProviderInput {
  // * ssrUserInfo is for info which is injected from SSR PAGE
  ssrUserInfo?: GetMeOutput;
}
const AuthContex = createContext({} as Provider | null);

const AuthProvider = ({
  children,
  ssrUserInfo,
}: PropsWithChildren<AuthProviderInput>) => {
  // * User info state ==================================== >
  const [userInfo, setUserInfo] = useState<GetMeOutput>(
    ssrUserInfo ?? {
      _id: "",
      accounts: [],
      categories: [],
      email: "",
      fullName: "",
      phone: "",
      userName: "",
      role: "USER",
    } // * User Info comes from SSR or CSR
  );
  //  * if user info comes from server by client navigations ====== >
  useEffect(() => {
    if (!ssrUserInfo) return;
    setUserInfo(ssrUserInfo);
  }, [ssrUserInfo]);

  // * Login state ============================ >
  const [isLogin, setIslogin] = useState<boolean>(false);

  // * A method to update or change usernfo =========================== >
  const setInfo = useCallback((info: Partial<GetMeOutput>) => {
    setUserInfo((prev) => {
      return { ...prev, ...info };
    });
  }, []);

  // * A Method To Add Category =========== >
  const addCategory = useCallback((category: CreatedCategoryReturnService) => {
    userInfo.categories.unshift(category);
    setUserInfo(userInfo);
  }, []);

  // * Authorizing user ==================================== >
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: keys.userInfo.all,
    initialData: ssrUserInfo ?? undefined,
    queryFn: getUserInfo,
  });

  // * Refetch Query method ================= >
  const refetchMe = useCallback(async (): Promise<void> => {
    await refetch();
  }, []);

  // * Updating State ==================== >
  useEffect(() => {
    if (isLoading) return;
    if (isError) return;
    // * user is authorized successfully =================>
    setIslogin(true);
    setUserInfo(data as GetMeOutput);
  }, [isLoading, isError, data]);

  return (
    <AuthContex.Provider
      value={{ setInfo, userInfo, isLogin, refetchMe, addCategory }}
    >
      {children}
    </AuthContex.Provider>
  );
};

export { AuthContex, AuthProvider };
export type { AuthProviderInput };
