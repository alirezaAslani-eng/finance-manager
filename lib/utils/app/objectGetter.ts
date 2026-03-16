const objectGetter = <T = unknown>({
  obj,
  path,
}: {
  obj: object;
  path: string;
}): T => {
  const serialized_path: string[] = path.split("."); // * <<< "user.name" -> "['user', 'name']"

  const value = serialized_path.reduce<object | undefined>(
    //@ts-ignore
    (acc, key) => acc?.[key],
    obj,
  );
  return value as T;
};

export default objectGetter;
