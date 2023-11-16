import { MutableRefObject, ReactNode } from "react";

export interface ITransitionArgs {
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

export interface IAnimationProps {
  children: ReactNode;
  isMount: boolean;
  nodeRef: MutableRefObject<null>;
  timeout?: number;
  classNames?: ITransitionArgs;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}
