import { Dispatch, SetStateAction } from "react";

export type IdList = Array<
  string | number | { [key: string]: [string | number] }
>;

interface IPostValues {
  author: {
    id: string | number;
    avatar: string | null;
    firstName: string;
    lastName: string;
    relativeDate: string;
    nickName: string;
  };
  title: string;
  caption: string;
  commentsCount: number;
  likeCount: number;
  imgUrl: string | null;
  postId: string | number;
  isSubscribeToAuthor: boolean;
  avatar: string | null;
  followList: IdList;
  likesList: IdList;
  totalLikes: number;
  totalComments: number;
  date: string | number | Date;
  firstName: string;
  lastName: string;
}
export type CommentsData = Required<
  Pick<
    IPostValues,
    | "totalComments"
    | "totalLikes"
    | "avatar"
    | "firstName"
    | "lastName"
    | "date"
    | "nickName"
    | "id"
    | "caption"
    | "likesList"
  >
>;

export type CommentValues = { comments?: CommentsData[] } & CommentsData;

export interface IPost extends IPostValues {
  comments: Array<CommentValues> | [];
}

export type SetIsOpenType = {
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
};
