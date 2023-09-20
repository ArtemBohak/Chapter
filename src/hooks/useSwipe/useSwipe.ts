import { useEffect, useRef, useState } from "react";

import { UseSwipeProps } from "./useSwipe.type";

const useSwipe = ({
  setIsOpen,
  axis = "clientX",
  touchDistinction = 150,
}: UseSwipeProps) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const { current: screenSize } = useRef(window.innerWidth);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.targetTouches[0][axis]);
    };
    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.targetTouches[0][axis]);
    };

    const handleTouchEnd = () => {
      if (touchStart - touchEnd > touchDistinction) {
        setIsOpen(false);
      }
    };
    if (screenSize < 769) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [screenSize, touchEnd, touchStart, setIsOpen, axis, touchDistinction]);
};

export default useSwipe;
