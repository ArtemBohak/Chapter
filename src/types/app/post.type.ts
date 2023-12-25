import { Dispatch, SetStateAction } from "react";

export interface Author {
  id: string | number;
  avatar: string | null;
  firstName: string;
  lastName: string;
  relativeDate: string | Date | number;
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
  likeCount: number;
  createAt: string | Date | number;
}

export type SetIsOpenType = {
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type IdList =
  | Array<string | number | { [key: string]: [string | number] }>
  | [];

export type CommentsData = Required<
  Pick<
    IPostValues,
    "postId" | "author" | "likeCount" | "commentsCount" | "createAt"
  >
> & {
  usersId: IdList;
  id: string | number;
  userId: string | number;
  text: string;
};

export type CommentValues = CommentsData & { comments?: CommentsData[] };

export interface IPost extends IPostValues {
  usersId: IdList;
  comments: Array<CommentValues> | [];
}
