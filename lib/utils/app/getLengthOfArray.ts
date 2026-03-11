function getLengthOfArray(array: Array<any>): number {
  if (array instanceof Array) return array.length;
  return 0;
}

export default getLengthOfArray;
