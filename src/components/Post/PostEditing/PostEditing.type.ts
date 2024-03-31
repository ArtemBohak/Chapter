import { ModalProps } from "@/src/components/Modal/Modal.type";

import { PostRefType } from "@/src/types";


export type PostEditingProps = {
  post: Pick<PostRefType, "caption" | "title" | "imgUrl"> & {
    postId: string | number
  };
  isScreenSize?: boolean;
} & Pick<ModalProps, "portal" | "isOpen" | "setIsOpen"> &
  Partial<ModalProps>;
