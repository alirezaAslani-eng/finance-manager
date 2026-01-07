/**
 * This function returns the changed properties from the second parameter "changedObj" relative to the first parameter "originalObj"
 *
 * @example
 * originalObj = { name: "Jak", age: 12 }
 * changedObj = { name: "Sam", age: 12 }
 * returns = { name: "Sam" }
 *
 */
function getChangedKeys<TReturn extends object = object>(
  originalObj: object,
  changedObj: object
): TReturn {
  const diff = {};
  Object.keys(originalObj).forEach((key) => {
    //@ts-ignore
    if (changedObj?.[key]) {
      //@ts-ignore
      if (changedObj[key] !== originalObj[key]) {
        //@ts-ignore
        diff[key] = changedObj[key];
      }
    }
  });

  return diff as TReturn;
}
export default getChangedKeys;
