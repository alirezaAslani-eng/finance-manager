import { AuthProviderProps } from "@/context";
import { DehydratedState } from "@tanstack/react-query";

interface GlobalAppProps extends AuthProviderProps {
  dehydratedState?: DehydratedState;
}

export type { GlobalAppProps };
