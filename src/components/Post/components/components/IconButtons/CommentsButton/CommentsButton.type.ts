import { FeedComponentProps } from "../../../FeedComponent/FeedComponent.type";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
} & Pick<FeedComponentProps, "totalComments" | "id" | "fetchData">;
