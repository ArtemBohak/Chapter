import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  setState: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    function onHandleOutsideClick(this: HTMLElement, event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node))
        setState(false);
    }
    document.addEventListener("click", onHandleOutsideClick);

    return () => document.removeEventListener("click", onHandleOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};
