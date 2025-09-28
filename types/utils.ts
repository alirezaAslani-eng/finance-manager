type ExcludeKeyType<T, ExcludedType> = {
  [key in keyof T as T[key] extends ExcludedType ? never : key]: T[key];
};

type IncludeKeyType<T, IncludedType> = {
  [key in keyof T as T[key] extends IncludedType ? key : never]: T[key];
};

type xx = { x: {}; y: string };

export type { ExcludeKeyType, IncludeKeyType };
