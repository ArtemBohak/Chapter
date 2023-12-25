import { PostProps } from "../../Post.type";

export type LikesButtonProps = { hiddenText?: boolean } & Required<
  Pick<PostProps, "usersId" | "likeCount">
> &
  Pick<PostProps, "fetchData"> & {
    id: string | number;
  };
