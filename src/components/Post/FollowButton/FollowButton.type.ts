import { Author } from "@/src/types";
import { PostProps } from "../Post.type";

export type FollowButtonProps = {
  classNames?: string;
} & Required<Pick<PostProps, "isSubscribeToAuthor">> &
  Pick<PostProps, "fetchData"> &
  Required<Pick<Author, "id">>;
