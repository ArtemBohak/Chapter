export type UseSwipeProps = {
  setIsOpen: (data: boolean) => void;
  axis?: "clientX" | "clientY";
  touchDistinction?: number;
};
