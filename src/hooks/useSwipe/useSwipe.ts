import { useEffect, useState } from "react";

import { UseSwipeProps } from "./useSwipe.type";
import { useGetScreenSize } from "@/src/hooks";

export const useSwipe = ({
  setIsShown,
  enableSwipe = false,
  axis = "clientX",
  touchDistinction = 200,
  enableSwipeOnScreen = 769,
}: UseSwipeProps) => {
  const [touchStart, setTouchStart] = useState(0);

  const [screenSize] = useGetScreenSize();

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) =>
      setTouchStart(e.changedTouches[0][axis]);

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0][axis];
      if (touchStart - touchEnd > touchDistinction) {
        setIsShown(false);
      }
    };

    if (enableSwipe && screenSize < enableSwipeOnScreen) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    axis,
    enableSwipe,
    enableSwipeOnScreen,
    screenSize,
    touchDistinction,
    touchStart,
  ]);
};
