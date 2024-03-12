import { IAuthor } from "@/src/types";
import { IPostProps } from "../../Post.type";

export type FollowButtonProps = {
  classNames?: string;
} & Required<Pick<IPostProps, "isSubscribeToAuthor">> &
  Required<Pick<IAuthor, "id">>;
