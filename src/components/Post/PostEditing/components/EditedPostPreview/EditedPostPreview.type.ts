import { ModalProps } from "@/src/components/Modal/Modal.type";
import { PostRefType, SetIsOpenType } from "@/src/types";
import { PostEditingProps } from "../../PostEditing.type";

export type PostPreviewProps = {
  file: File | null;
} & Pick<PostEditingProps, "prevImgUrl"> &
  Pick<PostRefType, "caption" | "title" | "imgUrl" | "postId"> &
  Pick<ModalProps, "setIsOpen"> &
  SetIsOpenType;

export type BodyProps = Partial<PostRefType>;
