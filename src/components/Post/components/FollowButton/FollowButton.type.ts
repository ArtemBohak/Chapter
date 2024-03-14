import { IPost, PostProps } from "../../Post.type";

export type FollowButtonProps = {
  classNames?: string;
} & Required<Pick<IPost, "isSubscribeToAuthor" | "id">> &
  Pick<PostProps, "postsApi">;
