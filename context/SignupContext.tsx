import { User_face } from "@/types/user.types";
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
  removeSignupCache(): void;
}

const SignupContext = createContext({} as Provider);

// * This Context responsible for cache signup info because user need to verify phone number and after verify we use cached info to register
function SignupProvider({ children }: PropsWithChildren) {
  const [signupInfo, setSignupInfo] = useState<SignupInfo | null>(null);
  const cacheSignupInfo = useCallback(
    ({ email, fullName, password, phone, userName }: SignupInfo) => {
      setSignupInfo({ email, fullName, password, phone, userName });
    },
    [setSignupInfo]
  );
  const removeSignupCache = useCallback(() => {
    setSignupInfo(null);
  }, [setSignupInfo]);
  return (
    <SignupContext.Provider
      value={{ cacheSignupInfo, signupInfo, removeSignupCache }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export { SignupContext, SignupProvider };
