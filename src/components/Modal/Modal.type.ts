import { ITransitionArgs } from "../Animation/Animation.type";

export type ModalProps = {
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
  setIsOpen: (isOpen: boolean) => void;
  clearData?: () => void;
};
