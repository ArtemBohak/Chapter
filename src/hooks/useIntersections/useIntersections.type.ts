import { MutableRefObject, RefObject } from "react";

export type RefType =
  | MutableRefObject<null>
  | RefObject<HTMLInputElement>
  | undefined;

export type OptionsType = {
  commentsIsShow?: boolean;
  postsIsLoad?: boolean;
} & Partial<IntersectionObserver>;

export type HandlerType = (value: number) => void;
