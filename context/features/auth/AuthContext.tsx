import { getUserInfo } from "@/api";
import { keyUserInfo } from "@/packages/react-query";
import { GetMeOutput } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { AuthProvidedValue, AuthProviderType } from "./types";

const AuthContex = createContext({} as AuthProvidedValue);

const AuthProvider: AuthProviderType = ({ children, ssrUserInfo }) => {
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
  const setInfo: AuthProvidedValue["setInfo"] = useCallback(
    (info) => {
      setUserInfo((prev) => {
        return { ...prev, ...info };
      });
    },
    [setUserInfo]
  );

  // * A Method To Add Category =========== >
  const addCategory: AuthProvidedValue["addCategory"] = useCallback(
    (category) => {
      setUserInfo((prev) => {
        return { ...prev, categories: [category, ...prev.categories] };
      });
    },
    [setUserInfo]
  );

  // * A Method to Edit Category =========== >
  const editCategory: AuthProvidedValue["editCategory"] = useCallback(
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
    [userInfo, setUserInfo]
  );

  // * Authorizing user ==================================== >
  const {
    data,
    isError,
    isLoading: isAuthing,
    refetch,
  } = useQuery({
    queryKey: keyUserInfo.all,
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
