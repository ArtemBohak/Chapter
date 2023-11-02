import { FeedActivityProps } from "../../Feed/components/FeedActivity/FeedActivity.type";

export type LikesButtonProps = Pick<
  FeedActivityProps,
  "likesList" | "totalLikes" | "id"
>;
