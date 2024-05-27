import { ModalProps } from "@/src/components/Modals/Modal/Modal.type";
import { PostType, SetIsOpenType } from "@/src/types";
import { PostCreationProps } from "../../PostCreation.type";

export type PostPreviewProps = {
  file: File | null;
  resetPostValues: () => void
} & Pick<PostCreationProps, "prevImgUrl"> &
  Pick<PostType, "caption" | "title" | "imgUrl"> &
  Pick<ModalProps, "setIsOpen"> &
  SetIsOpenType;

export type BodyProps = Partial<PostType>;
