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
  isAuthing: boolean;
  setInfo: (userInfo: Partial<GetMeOutput>) => void;
  refetchMe: () => Promise<void>;
  addCategory: (category: CreatedCategoryReturnService) => void;
  editCategory: (updatedCategory: { newName: string; _id: string }) => void;
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
    setUserInfo((prev) => {
      return { ...prev, categories: [category, ...prev.categories] };
    });
  }, []);

  // * A Method to Edit Category =========== >
  const editCategory: Provider["editCategory"] = useCallback(
    (updatedCategory) => {
      // * Find index of category that will be edited ======= >
      const categoryIndex = userInfo.categories.findIndex(
        (item) => item._id == updatedCategory._id
      );
      const updatedCategories = [...userInfo.categories];
      // * Mutate ==== >
      updatedCategories[categoryIndex].name = updatedCategory.newName;
      // * Set And Rerender ======= >
      setUserInfo((prev) => {
        return { ...prev, categories: updatedCategories };
      });
    },
    [userInfo]
  );

  // * Authorizing user ==================================== >
  const {
    data,
    isError,
    isLoading: isAuthing,
    refetch,
  } = useQuery({
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
    if (isAuthing) return;
    if (isError) return;
    // * user is authorized successfully =================>
    setIslogin(true);
    setUserInfo(data as GetMeOutput);
  }, [isAuthing, isError, data]);

  return (
    <AuthContex.Provider
      value={{
        setInfo,
        userInfo,
        isLogin,
        isAuthing,
        refetchMe,
        addCategory,
        editCategory,
      }}
    >
      {children}
    </AuthContex.Provider>
  );
};

export { AuthContex, AuthProvider };
export type { AuthProviderInput };
