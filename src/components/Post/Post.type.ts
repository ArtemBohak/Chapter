import { MutableRefObject, RefObject } from "react";
import { Author, IPost, SetIsOpenType } from "@/src/types";
import { ModalProps } from "@/src/components/Modal/Modal.type";

export type PostProps = {
  nodeRef?: MutableRefObject<null> | RefObject<HTMLDivElement>;
  file?: File | null;
  setFormIsOpen?: SetIsOpenType;
  fetchData?: (id: string | number) => void;
} & Partial<ModalProps> &
  Partial<IPost> &
  Partial<Author>;
