import { PostProps } from "../../../Post.type";

export type CommentsData = Pick<
  PostProps,
  | "totalComments"
  | "totalLikes"
  | "avatar"
  | "firstName"
  | "lastName"
  | "date"
  | "nickName"
  | "id"
  | "text"
  | "likesList"
>;

export type Comment = { comments?: CommentsData[] } & CommentsData;

export type CommentsArray = Array<Comment>;

export type CommentsProps = { comments: CommentsArray };
