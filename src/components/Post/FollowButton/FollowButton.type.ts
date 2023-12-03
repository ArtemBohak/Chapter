import { PostProps } from "../Post.type";

export type FollowButtonProps = {
  classNames?: string;
} & Pick<PostProps, "followList" | "id" | "fetchData">;
