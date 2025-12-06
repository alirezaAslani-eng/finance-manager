import { AuthProviderInput } from "@/context/AuthContext";
import { DehydratedState } from "@tanstack/react-query";

interface GlobalAppProps extends AuthProviderInput {
  dehydratedState?: DehydratedState;
}

export type { GlobalAppProps };
