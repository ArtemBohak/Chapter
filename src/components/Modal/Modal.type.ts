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
  portal?: boolean;
  backdropClassName?: string;
  bodyClassName?: string;
  transitionTimeOut?: number;
  transitionClassName: ITransitionArgs;
};
