import { PostProps } from "../Post.type";

export type FollowButtonProps = {
  classNames?: string;
} & Required<Pick<PostProps, "id">> &
  Pick<PostProps, "fetchData" | "isSubscribed" | "followList">;
