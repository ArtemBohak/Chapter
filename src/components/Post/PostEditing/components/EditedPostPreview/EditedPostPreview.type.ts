import { ModalProps } from "@/src/components/Modal/Modal.type";
import { IPost, SetIsOpenType } from "@/src/types";

export type PostPreviewProps = {
  file: File | null;
} & Pick<IPost, "caption" | "title" | "imgUrl" | "postId"> &
  Pick<ModalProps, "setIsOpen"> &
  SetIsOpenType;

export type BodyProps = Partial<IPost>;
