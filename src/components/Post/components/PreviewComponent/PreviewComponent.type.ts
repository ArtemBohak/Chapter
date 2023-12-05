import { ModalProps } from "@/src/components/Modal/Modal.type";
import { IPost, SetFormIsOpenType } from "@/src/types";

export type PreviewComponentProps = {
  file: File | null;
} & Pick<IPost, "imageUrl" | "text" | "title"> &
  Pick<ModalProps, "setIsOpen" | "clearData"> &
  SetFormIsOpenType;

export type BodyProps = Partial<IPost>;
