import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";

export type SetNumberType = Dispatch<SetStateAction<number>>;
export type RefType =
  | MutableRefObject<null>
  | RefObject<HTMLInputElement>
  | undefined;

export type OptionsType = {
  commentsIsShow?: boolean;
  postsIsLoad?: boolean;
} & Partial<IntersectionObserver>;
