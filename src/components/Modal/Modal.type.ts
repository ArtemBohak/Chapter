import { ITransitionArgs } from "../Animation/Animation.type";

export type ModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  isOpen: boolean;
  transitionClassName?: ITransitionArgs;
  disableScroll?: boolean;
  transitionTimeOut?: number;
  portal?: boolean;
  backdropClassName?: string;
  bodyClassName?: string;
  axis?: "clientX" | "clientY";
  touchDistinction?: number;
  enableSwipeOnScreen?: number;
  enableSwipe?: boolean;
  clearData?: () => void;
};
