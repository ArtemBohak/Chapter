import { FeedActivityProps } from "../../FeedActivity/FeedActivity.type";

export type LikesButtonProps = { hiddenText?: boolean } & Pick<
  FeedActivityProps,
  "likesList" | "totalLikes" | "id"
>;
