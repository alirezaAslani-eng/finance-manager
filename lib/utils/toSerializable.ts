const toSerializable = <TOutput = any, TInput = any>(
  value: TInput
): TOutput => {
  return JSON.parse(JSON.stringify(value));
};
export default toSerializable;
