import { PostProps } from "../../../Post.type";

export type CommentsData = Required<
  Pick<
    PostProps,
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

export type CommentsProps = { comments: Array<CommentValues> };
