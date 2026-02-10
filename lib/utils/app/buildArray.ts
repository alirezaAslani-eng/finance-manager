function buildArray<TItem = number>(
  length: number,
  indexModifier?: (index: number) => TItem,
): TItem[] {
  return Array.from({ length }, (_, index): TItem => {
    if (indexModifier) return indexModifier(index);
    // @ts-ignore
    return index; // * it only happens when indexModifier is undefined
  });
}

export default buildArray;
