import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";

export type IdList =
  | Array<string | number | { [key: string]: [string | number] }>
  | [];

export type SetIsOpenType = {
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
};

export interface Author {
  id: string | number;
  avatar: string | null;
  firstName: string;
  lastName: string;
  relativeDate?: string | Date | number;
  nickName: string;
}

interface IPostValues {
  postId: string | number;
  author: Author;
  title: string | null;
  caption: string | null;
  imgUrl: string | null;
  isSubscribeToAuthor: boolean;
  commentsCount: number;
  commentCount?: number;
  createAt: string | Date | number;
  updatedAt: string | Date | number;
}

type CommentsData = Required<
  Pick<IPostValues, "postId" | "author" | "commentsCount">
> &
  Pick<IPostValues, "commentCount"> & {
    usersId: IdList;
    id: string | number;
    parentId?: string | number;
    text: string;
    createdAt: string | Date | number;
    replyTo?: Pick<Author, "id" | "nickName">;
  };

export type CommentValues = CommentsData & { comments?: CommentsData[] };

export interface IPost extends IPostValues {
  userIds: IdList;
  comments: Array<CommentValues> | [];
}

export type RefType = MutableRefObject<null> | RefObject<HTMLDivElement>;
