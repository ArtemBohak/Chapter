import { ModalProps } from "@/src/components/Modal/Modal.type";
import { PostRefType, SetIsOpenType } from "@/src/types";

export type PostPreviewProps = {
  file: File | null;
} & Pick<PostRefType, "caption" | "title" | "imgUrl" | "postId"> &
  Pick<ModalProps, "setIsOpen"> &
  SetIsOpenType;

export type BodyProps = Partial<PostRefType>;
