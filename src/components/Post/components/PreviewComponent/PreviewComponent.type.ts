import { IPost, SetIsOpen } from "@/src/types";

export type PreviewComponentProps = Pick<IPost, "image" | "text" | "title"> &
  SetIsOpen;
