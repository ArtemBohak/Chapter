import { PostProps } from "../Post.type";

export type FollowButtonProps = {
  classNames?: string;
} & Required<Pick<PostProps, "followList" | "id">> &
  Pick<PostProps, "fetchData">;
