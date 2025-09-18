import { User_face } from "@/types/user.types";
import { Sign } from "crypto";
import React, { PropsWithChildren, useCallback, useState } from "react";
import { createContext } from "react";

interface SignupInfo
  extends Pick<
    User_face,
    "email" | "fullName" | "password" | "phone" | "userName"
  > {}
interface Provider {
  signupInfo: SignupInfo | null;
  cacheSignupInfo: (info: SignupInfo) => void;
}

const SignupContext = createContext({} as Provider);

// * This Context responsible for cache signup info because user need to verify phone number and after verify we use cached info to register
function SignupProvider({children}:PropsWithChildren) {
  const [signupInfo, setSignupInfo] = useState<SignupInfo | null>(null);
  const cacheSignupInfo = useCallback((info: SignupInfo) => {
    setSignupInfo(info);
  }, []);
  return (
    <SignupContext.Provider
      value={{ cacheSignupInfo, signupInfo }}
    >{children}</SignupContext.Provider>
  );
}

export { SignupContext, SignupProvider };
