interface ComponentFetchState<TData = any> {
  isError?: boolean;
  isPending?: boolean;
  data?: TData;
}

export type { ComponentFetchState };
