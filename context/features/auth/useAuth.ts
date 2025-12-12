import { useContext } from "react";
import { UseAuth } from "./types";
import { AuthContex } from "./AuthContext";

const useAuth: UseAuth = () => {
  const providedAuth = useContext(AuthContex);
  return providedAuth;
};

export default useAuth;
