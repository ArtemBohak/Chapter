import { FeedProps } from "../../Feed.type";

export type FeedTextProps = Pick<FeedProps, "text" | "title">;

export enum Words {
  ScreenSize = 769,
  MobWords = 36,
  TabletWords = 88,
}
