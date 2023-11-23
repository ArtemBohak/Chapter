import { ModalProps } from "@/src/components/Modal/Modal.type";
import { IPost, SetIsOpen } from "@/src/types";

export type PostPreviewProps = Pick<IPost, "text" | "title" | "image"> &
  SetIsOpen & {
    file: File | null;
  } & Pick<ModalProps, "setIsOpen" | "clearData">;
