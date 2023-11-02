import { useRef } from "react";

export const useGetScreenSize = () => {
  const { current: screenSize } = useRef(window.innerWidth);

  return [screenSize];
};
