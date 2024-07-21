import { MutableRefObject, ReactNode, RefObject } from "react";

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
  in?: boolean;
  nodeRef?: MutableRefObject<null> | RefObject<HTMLElement>;
  timeout?: number;
  classNames?: ITransitionArgs;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  key?: string | number;
}
