import { Dispatch, SetStateAction } from "react";
import {
  Author,
  IPost,
  RefType,
  RefsType,
  SetIsOpenType,
  PostRefType,
} from "@/src/types";
import { ModalProps } from "@/src/components/Modal/Modal.type";

export interface IPostProps
  extends Partial<ModalProps>,
    Partial<IPost>,
    Partial<Author> {
  nodeRef?: RefType;
  file?: File | null;
  setFormIsOpen?: SetIsOpenType;
}

export type PostProps = {
  setPage?: Dispatch<SetStateAction<number>>;
  setPosts?: Dispatch<SetStateAction<Array<PostRefType>>>;
  setPost?: Dispatch<SetStateAction<IPost | null>>;
} & IPost &
  RefsType;
