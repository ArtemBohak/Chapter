import { ModalProps } from "@/src/components/Modal/Modal.type";
import { PostType, SetIsOpenType } from "@/src/types";

export type PostPreviewProps = {
  file: File | null;
  prevImgUrl?: string | null;
} & Pick<PostType, "caption" | "title" | "imgUrl"> &
  Pick<ModalProps, "setIsOpen"> &
  SetIsOpenType;

export type BodyProps = Partial<PostType>;
