import { useEffect, useRef, useState } from "react";

import { UseSwipeProps } from "./useSwipe.type";

const useSwipe = ({
  setIsOpen,
  swipeIsOn = false,
  axis = "clientX",
  touchDistinction = 200,
  swipeOnscreen = 769,
}: UseSwipeProps) => {
  const [touchStart, setTouchStart] = useState(0);
  const { current: screenSize } = useRef(window.innerWidth);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) =>
      setTouchStart(e.changedTouches[0][axis]);

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0][axis];
      if (touchStart - touchEnd > touchDistinction) setIsOpen(false);
    };

    if (swipeIsOn && screenSize < swipeOnscreen) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    screenSize,
    touchStart,
    axis,
    touchDistinction,
    swipeIsOn,
    swipeOnscreen,
  ]);
};

export default useSwipe;
