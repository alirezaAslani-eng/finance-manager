import { getUserInfo } from "@/api/get";
import { keys } from "@/config/react-query";
import { GetMeOutput } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

interface provider {
  userInfo: GetMeOutput;
  isLogin: boolean;
  setInfo: (userInfo: Partial<GetMeOutput>) => void;
}
const AuthContex = createContext({} as provider);

const AuthProvider = ({ children }: PropsWithChildren) => {
  // * User info state ==================================== >
  const [userInfo, setUserInfo] = useState<GetMeOutput>({
    email: "",
    fullName: "",
    phone: "",
    userName: "",
    role: "USER",
  });

  // * Login state ============================ >
  const [isLogin, setIslogin] = useState<boolean>(false);

  // * A method to update or change usernfo =========================== >
  const setInfo = useCallback((info: Partial<GetMeOutput>) => {
    setUserInfo((prev) => {
      return { ...prev, ...info };
    });
  }, []);

  // * Authorizing user ==================================== >
  const { data, isError, isLoading } = useQuery({
    queryKey: keys.userInfo.all,
    queryFn: getUserInfo,
  });

  // * Updating State ==================== >
  useEffect(() => {
    if (isLoading) return;
    if (isError) return;
    // * user is authorized successfully =================>
    setIslogin(true);
    setUserInfo(data as GetMeOutput);
  }, [isLoading, isError]);

  return (
    <AuthContex.Provider value={{ setInfo, userInfo, isLogin }}>
      {children}
    </AuthContex.Provider>
  );
};

export { AuthContex, AuthProvider };
