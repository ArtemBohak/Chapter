import { Dispatch, ReactNode, SetStateAction } from "react";

export type CustomModalProps = {
  children: ReactNode;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  close: () => void;
  classNames?: string;
  activeClassNames?: string;
  axis?: "clientX" | "clientY";
  touchDistinction?: number;
  enableSwipeOnScreen?: number;
  enableSwipe?: boolean;
};
