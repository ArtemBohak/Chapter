import { IPost, SetIsOpen } from "@/src/types";

export type PreviewComponentProps = Pick<IPost, "image" | "text" | "title"> &
  SetIsOpen & { file: File | null };

export type BodyProps = { postUrl?: string; postId?: string } & Partial<IPost>;
