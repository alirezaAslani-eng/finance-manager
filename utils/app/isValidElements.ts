export default function isValidElements<TElements extends Element[]>(
  elements: TElements | null,
): TElements | false {
  if (elements?.[0] instanceof Element) return elements;
  return false;
}
