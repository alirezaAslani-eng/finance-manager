import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type Refetch<TData = unknown, TError = unknown> = (
  options?: RefetchOptions | undefined
) => Promise<QueryObserverResult<TData | TError,Error>>;

export type { Refetch };
