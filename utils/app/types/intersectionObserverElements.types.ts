interface IntersectionObserverElementsConfig {
  elements: (HTMLElement | null | undefined)[];
  root?: HTMLElement;
  threshold?: number | number[];
  rootMargin?: string;
  entry: IntersectionObserverCallback;
}
interface IntersectionObserverElementsReturnType {
  unobserveElements: () => void;
}

type IntersectionObserverElements = (
  config: IntersectionObserverElementsConfig,
) => IntersectionObserverElementsReturnType;

export type { IntersectionObserverElements };
