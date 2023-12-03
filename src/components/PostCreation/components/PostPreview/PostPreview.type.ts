import { ModalProps } from "@/src/components/Modal/Modal.type";
import { IPost, SetFormIsOpenType } from "@/src/types";

export type PostPreviewProps = {
  file: File | null;
} & Pick<IPost, "text" | "title" | "imageUrl"> &
  Pick<ModalProps, "setIsOpen" | "clearData"> &
  SetFormIsOpenType;

export type BodyProps = Partial<IPost>;
