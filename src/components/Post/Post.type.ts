import { Dispatch, SetStateAction } from "react";
import { IAuthor, PostType, RefsType, PostRefType } from "@/src/types";
import { ModalProps } from "@/src/components/Modals/Modal/Modal.type";

export interface IPost
  extends Partial<ModalProps>,
    Partial<PostType>,
    Partial<IAuthor> {}

export type PostProps = {
  setPage?: Dispatch<SetStateAction<number>>;
  setPosts?: Dispatch<SetStateAction<Array<PostRefType>>>;
  setPost?: Dispatch<SetStateAction<PostType | null>>;
  postsApi?: () => Promise<void>;
  classNames?: string;
} & PostType &
  RefsType;
