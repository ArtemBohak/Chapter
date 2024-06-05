// import { useRef } from "react";

// export const useGetScreenSize = () => {
//   const { current: screenSize } = useRef(window.innerWidth);

//   return [screenSize];
// };

import { useState, useEffect } from 'react';

export const useGetScreenSize = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return [screenSize];
};
