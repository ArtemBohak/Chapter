import { ModalProps } from "@/src/components/Modal/Modal.type";
import { IPost } from "../Post.type";


export type PostEditingProps = {
  post: Pick<IPost, "caption" | "title" | "imgUrl"> & {
    postId: string | number
  };
  isScreenSize?: boolean;
} & Pick<ModalProps, "portal" | "isOpen" | "setIsOpen"> &
  Partial<ModalProps>;
