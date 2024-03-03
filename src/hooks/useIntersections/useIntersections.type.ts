import { MutableRefObject, RefObject } from "react";

export type RefType =
  | MutableRefObject<null>
  | RefObject<HTMLDivElement>
  | undefined;

export type OptionsType = {
  commentsIsShow?: boolean;
  postsIsLoad?: boolean;
} & Partial<IntersectionObserver>;

export type HandlerType = (value: HTMLDivElement) => void;
