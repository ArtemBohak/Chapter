import { Feed } from "@/src/pages/FeedPage/types/FeedPage.types";

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

export type Comment = { subComments?: CommentsData[] } & CommentsData;

export type CommentsProps = { comments: Array<Comment> };
