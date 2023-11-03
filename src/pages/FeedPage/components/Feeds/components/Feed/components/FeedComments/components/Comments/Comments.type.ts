import { Feed } from "@/src/pages/FeedPage/FeedPage.types";

export type CommentsData = Pick<
  Feed,
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
