import { FeedComponentProps } from "../../FeedComponent/FeedComponent.type";

export type PostTextProps = Pick<FeedComponentProps, "text"> & {
  isLimit?: boolean;
};

export enum Words {
  ScreenSize = 769,
  MobWords = 36,
  TabletWords = 88,
}
