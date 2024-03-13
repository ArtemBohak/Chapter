import { Dispatch, SetStateAction } from "react";

export const intersectionHandlerCB =
  (setPage?: Dispatch<SetStateAction<number>>) =>
  (
    entry: IntersectionObserverEntry,
    element: HTMLElement,
    attributeName = "data-value"
  ) => {
    const value = element.getAttribute(attributeName);

    if (value && !isNaN(+value) && entry.isIntersecting)
      setPage && setPage(+value);
  };
