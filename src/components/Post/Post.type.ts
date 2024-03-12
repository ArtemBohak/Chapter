import { Dispatch, SetStateAction } from "react";
import {
  IAuthor,
  PostType,
  RefType,
  RefsType,
  SetIsOpenType,
  PostRefType,
} from "@/src/types";
import { ModalProps } from "@/src/components/Modal/Modal.type";

export interface IPostProps
  extends Partial<ModalProps>,
    Partial<PostType>,
    Partial<IAuthor> {
  nodeRef?: RefType;
  file?: File | null;
  setFormIsOpen?: SetIsOpenType;
}

export type PostProps = {
  setPage?: Dispatch<SetStateAction<number>>;
  setPosts?: Dispatch<SetStateAction<Array<PostRefType>>>;
  setPost?: Dispatch<SetStateAction<PostType | null>>;
} & PostType &
  RefsType;
