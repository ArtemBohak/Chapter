import { PostProps } from "../../../Post.type";

export type FollowButtonProps = Pick<
  PostProps,
  "followList" | "id" | "fetchData"
> & { classNames?: string };
