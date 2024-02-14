import { Dispatch, SetStateAction } from "react";

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
  createAt: string | Date | number;
}

export type SetIsOpenType = {
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type IdList =
  | Array<string | number | { [key: string]: [string | number] }>
  | [];

export type CommentsData = Required<
  Pick<IPostValues, "postId" | "author" | "commentsCount">
> & {
  usersId: IdList;
  id: string | number;
  parrentId?: string | number;
  text: string;
  createdAt: string | Date | number;
};

export type CommentValues = CommentsData & { comments?: CommentsData[] };

export interface IPost extends IPostValues {
  userIds: IdList;
  comments: Array<CommentValues> | [];
}
