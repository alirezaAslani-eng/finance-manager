/**
 * Take an unknown value and parse it to number if it was possible. if it wasn't it returns null 
 */
const identifyNumber = (val: unknown): number | null => {
  const number = Number(val);
  if (number) return number;
  return null;
};

export default identifyNumber;
