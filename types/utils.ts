type ExcludeKeyType<T extends object, ExcludedType> = {
  [key in keyof T as T[key] extends ExcludedType ? never : key]: T[key];
};

type IncludeKeyType<T extends object, IncludedType> = {
  [key in keyof T as T[key] extends IncludedType ? key : never]: T[key];
};

type ParamType<Func = Function> = Func extends (params: infer P) => infer R
  ? P
  : any;

export type { ExcludeKeyType, IncludeKeyType, ParamType };
