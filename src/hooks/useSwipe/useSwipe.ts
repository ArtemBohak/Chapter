import { useEffect, useState } from "react";

import { UseSwipeProps } from "./useSwipe.type";
import { useGetScreenSize } from "@/src/hooks";

export const useSwipe = ({
  leftSwipeCB,
  rightSwipeCB,
  nodeRef,
  enableSwipe = false,
  axis = "clientX",
  touchDistinction = 200,
  enableSwipeOnScreen = 769,
}: UseSwipeProps) => {
  const [touchStart, setTouchStart] = useState(0);

  const [screenSize] = useGetScreenSize();

  useEffect(() => {
    const element = nodeRef?.current;
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.changedTouches[0][axis]);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0][axis];

      if (touchStart - touchEnd > touchDistinction) {
        leftSwipeCB && leftSwipeCB();
      }

      if (touchStart - touchEnd < -touchDistinction) {
        rightSwipeCB && rightSwipeCB();
      }
    };

    if (enableSwipe && screenSize < enableSwipeOnScreen) {
      if (nodeRef) {
        element?.addEventListener("touchstart", handleTouchStart);
        element?.addEventListener("touchend", handleTouchEnd);
      } else {
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);
      }
    }

    return () => {
      if (nodeRef) {
        element?.removeEventListener("touchstart", handleTouchStart);
        element?.removeEventListener("touchend", handleTouchEnd);
      } else {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [
    axis,
    enableSwipe,
    enableSwipeOnScreen,
    nodeRef,
    screenSize,
    touchDistinction,
    touchStart,
    leftSwipeCB,
    rightSwipeCB,
  ]);
};
