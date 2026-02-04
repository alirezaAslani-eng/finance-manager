interface IntersectionObserverElementsConfig {
  elements: HTMLElement[];
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
