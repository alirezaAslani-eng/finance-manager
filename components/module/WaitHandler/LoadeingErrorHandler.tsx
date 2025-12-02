import { PropsWithChildren, ReactNode } from "react";

interface MyProp {
  isLoading?: {
    loading: ReactNode;
    check: boolean;
  };
  isError?: {
    error: ReactNode;
    check: boolean;
  };
  dataCheck?: {
    error: ReactNode; //  < -- render this if check == true
    check: boolean;
  };
}

const defProps = {
  isError: {
    error: <></>, //  < -- render this if check == true
    check: false,
  },
  isLoading: {
    loading: <></>, // < -- render this if check == true
    check: false,
  },
  dataCheck: {
    error: <></>, // < -- render this if check == false
    check: true,
  },
};

export default function LoadeingErrorHandler({
  isLoading = defProps.isLoading,
  isError = defProps.isError,
  dataCheck = defProps.dataCheck,
  children,
}: PropsWithChildren<MyProp>) {
  if (isLoading?.check) return isLoading?.loading;
  else if (isError?.check) return isError?.error;
  else if (!dataCheck?.check) return dataCheck?.error;

  if (children) return <>{children}</>;
}
