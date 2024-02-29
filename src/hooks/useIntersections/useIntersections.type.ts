import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";

export type SetNumberType = Dispatch<SetStateAction<number>>;
export type RefType =
  | MutableRefObject<null>
  | RefObject<HTMLInputElement>
  | undefined;
export type IntersectionsOptionsType = {
  commentsIsShow?: boolean;
  postsIsLoad?: boolean;
};
