import { ModalProps } from "@/src/components/Modals/Modal/Modal.type";

import { PostRefType } from "@/src/types";

export type PostEditingProps = {
  prevImgUrl?: string | null;
  post: Pick<PostRefType, "caption" | "title" | "imgUrl"> & {
    postId: string | number;
  };
  isScreenSize?: boolean;
} & Pick<ModalProps, "portal" | "isOpen" | "setIsOpen"> &
  Partial<ModalProps>;
