import { FeedActivityProps } from "../../Feed/components/FeedActivity/FeedActivity.type";

export type CommentsButtonProps = { textValue?: string } & Pick<
  FeedActivityProps,
  "totalComments" | "id"
>;
