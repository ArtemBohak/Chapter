import { useEffect } from "react";

export const useHideElement = (elementId: string, isHidden?: boolean) => {
  useEffect(() => {
    const element = document.getElementById(elementId);

    isHidden && element?.classList.add("hidden");

    !isHidden && element?.classList.remove("hidden");
  }, [elementId, isHidden]);
};
