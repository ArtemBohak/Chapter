import { PostProps } from "../../Post.type";

export type LikesButtonProps = { hiddenText?: boolean } & Required<
  Pick<PostProps, "userIds">
> &
  Pick<PostProps, "fetchData"> & {
    id: string | number;
  };
