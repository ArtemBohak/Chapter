import { MutableRefObject, RefObject } from "react";
import { IPost, SetIsOpenType } from "@/src/types";
import { ModalProps } from "@/src/components/Modal/Modal.type";

export type PostProps = {
  nodeRef?: MutableRefObject<null> | RefObject<HTMLDivElement>;
  file?: File | null;
  fetchData?: (id: string | number) => void;
  setFormIsOpen?: SetIsOpenType;
} & Partial<ModalProps> &
  Partial<IPost>;
