import { FeedProps } from "../../Feed.type";

export type FeedActivityProps = Pick<
  FeedProps,
  | "likesList"
  | "totalLikes"
  | "totalComments"
  | "date"
  | "firstName"
  | "lastName"
  | "id"
>;
