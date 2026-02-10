export default function isValidElement<TElement extends Element | Window>(
  el: TElement | null | undefined,
): TElement | false {
  if (el instanceof Element || el instanceof Window) return el;
  return false;
}
