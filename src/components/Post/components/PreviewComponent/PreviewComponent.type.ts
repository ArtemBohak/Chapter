import { ModalProps } from "@/src/components/Modal/Modal.type";
import { IPost, SetIsOpen } from "@/src/types";

export type PreviewComponentProps = Pick<IPost, "image" | "text" | "title"> &
  SetIsOpen & { file: File | null } & Pick<ModalProps, "setIsOpen">;

export type BodyProps = { postUrl?: string; postId?: string } & Partial<IPost>;
