import { Dispatch, SetStateAction } from "react";
import { IAnimationProps, ITransitionArgs } from "../Animation/Animation.type";

export type ModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
} & Pick<IAnimationProps, "mountOnEnter" | "unmountOnExit">;
