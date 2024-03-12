import { MutableRefObject, RefObject } from "react";
import { Author, IPost, SetIsOpenType } from "@/src/types";
import { ModalProps } from "@/src/components/Modal/Modal.type";

export interface IPostProps
  extends Partial<ModalProps>,
    Partial<IPost>,
    Partial<Author> {
  nodeRef?: MutableRefObject<null> | RefObject<HTMLDivElement>;
  file?: File | null;
  setFormIsOpen?: SetIsOpenType;
}
