type ElementsType = (Element | null | undefined)[] | null | undefined;
export default function isValidElements<
  TElements extends ElementsType = Element[],
>(elements: TElements): TElements | false {
  if (!elements) return false;
  if (elements?.[0] instanceof Element) return elements as TElements;
  return false;
}
