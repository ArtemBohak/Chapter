import { FeedActivityProps } from "../../FeedActivity.type";

export type CommentsButtonProps = Pick<
  FeedActivityProps,
  "totalComments" | "id"
>;
