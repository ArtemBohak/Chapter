import { ModalProps } from "@/src/components/Modal/Modal.type";
import { IPost, SetIsOpen } from "@/src/types";

export type PreviewComponentProps = Pick<IPost, "image" | "text" | "title"> &
  SetIsOpen & {
    file: File | null;
  } & Pick<ModalProps, "setIsOpen" | "clearData">;

export type BodyProps = { imageUrl?: string } & Partial<IPost>;
