type Test_type<A, B> = A extends B ? true : false;

type NewProps<T, N> = {
  [key in keyof T]: N;
};
export type { Test_type, NewProps };
