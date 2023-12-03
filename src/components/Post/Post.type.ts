import { MutableRefObject, RefObject } from "react";
import { IPost, SetFormIsOpenType } from "@/src/types";
import { ModalProps } from "@/src/components/Modal/Modal.type";

export type PostProps = {
  nodeRef?: MutableRefObject<null> | RefObject<HTMLDivElement>;
  file?: File | null;
  fetchData?: (id: string | number) => void;
  setFormIsOpen?: SetFormIsOpenType;
} & Partial<ModalProps> &
  Partial<IPost>;
