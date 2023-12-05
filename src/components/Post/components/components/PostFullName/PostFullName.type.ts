import { FeedComponentProps } from "../../FeedComponent/FeedComponent.type";

export type PostFullNameProps = Pick<
  FeedComponentProps,
  "firstName" | "lastName"
>;
