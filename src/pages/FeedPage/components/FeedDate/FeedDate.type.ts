import { FeedActivityProps } from "../Feed/components/FeedActivity/FeedActivity.type";

export type FeedDateProps = Pick<
  FeedActivityProps,
  "date" | "firstName" | "lastName"
>;
