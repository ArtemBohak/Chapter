import { IPost, SetIsOpen } from "@/src/types";

export type PostPreviewProps = Pick<IPost, "text" | "title" | "image"> &
  SetIsOpen & { file: File | null };
