const toSerializable = <T = null>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};
export default toSerializable;
