import { FeedActivityProps } from "../../FeedActivity/FeedActivity.type";

export type CommentsButtonProps = {
  textValue?: string;
  hiddenText?: boolean;
} & Pick<FeedActivityProps, "totalComments" | "id">;
