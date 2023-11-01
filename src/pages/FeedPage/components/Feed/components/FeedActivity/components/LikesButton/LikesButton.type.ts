import { FeedActivityProps } from "../../FeedActivity.type";

export type LikesButtonProps = Pick<
  FeedActivityProps,
  "likesList" | "totalLikes" | "id"
>;
