interface ITransitionArgs {
  appear?: string;
  appearActive?: string;
  appearDone?: string;
  enter?: string;
  enterActive?: string;
  enterDone?: string;
  exit?: string;
  exitActive?: string;
  exitDone?: string;
}

export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  transitionClassName: ITransitionArgs;
  transitionTimeOut?: number;
  portal?: boolean;
  backdropClassName?: string;
  bodyClassName?: string;
  axis?: "clientX" | "clientY";
  touchDistinction?: number;
  swipeOnscreen?: number;
  swipeIsOn?: boolean;
};
