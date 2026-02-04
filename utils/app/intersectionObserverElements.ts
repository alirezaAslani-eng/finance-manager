import { IntersectionObserverElements } from "./types";

const intersectionObserverElements: IntersectionObserverElements = ({
  elements,
  root,
  threshold,
  rootMargin,
  entry,
}) => {
  const observerList: IntersectionObserver[] = [];
  elements.forEach((element) => {
    if (!(element instanceof Element)) return;
    const observer = new IntersectionObserver(entry, {
      threshold,
      root,
      rootMargin,
    });
    observer.observe(element);
    observerList.push(observer);
  });
  /**
   * unobserve all observed elements
   */
  const unobserveElements = () => {
    observerList.forEach((observe, i) => {
      if (!(elements[i] instanceof Element)) return;
      observe.unobserve(elements[i]);
    });
  };
  return { unobserveElements };
};

export default intersectionObserverElements;
