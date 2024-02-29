import { ModalProps } from "@/src/components/Modal/Modal.type";
import { IPost } from "@/src/types";

export type PostEditingProps = {
  post: Pick<IPost, "caption" | "title" | "imgUrl"> & {
    id: string | number
  };
  isScreenSize?: boolean;
} & Pick<ModalProps, "portal" | "isOpen" | "setIsOpen"> &
  Partial<ModalProps>;
