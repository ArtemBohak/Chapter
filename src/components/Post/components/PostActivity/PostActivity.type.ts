import { PostProps } from "../../Post.type";

export type PostActivityProps = Pick<
  PostProps,
  | "likesList"
  | "totalLikes"
  | "totalComments"
  | "date"
  | "firstName"
  | "lastName"
  | "id"
>;
