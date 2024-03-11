import { Author } from "@/src/types";
import { PostProps } from "../Post.type";

export type FollowButtonProps = {
  classNames?: string;
} & Required<Pick<PostProps, "isSubscribeToAuthor">> &
  Required<Pick<Author, "id">>;
