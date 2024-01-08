import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  setState: Dispatch<SetStateAction<boolean>>,
  id?: string
) => {
  useEffect(() => {
    function onHandleOutsideClick(this: HTMLElement, event: Event) {
      const target = event.target as HTMLElement;

      if (ref.current && !ref.current.contains(target) && target.id !== id) {
        setState(false);
      }
    }
    document.addEventListener("click", onHandleOutsideClick);

    return () => {
      document.removeEventListener("click", onHandleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};
