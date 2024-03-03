import { Dispatch, SetStateAction } from "react";

export const intersectionHandlerCB =
  (setPage: Dispatch<SetStateAction<number>>) => (element: HTMLDivElement) => {
    const value = element.getAttribute("data-value");

    if (value && !isNaN(+value)) setPage(+value);
  };
