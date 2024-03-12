import { IPostProps } from "../Post.type";

export type PostTextProps = {
  isLimited?: boolean;
} & Required<Pick<IPostProps, "caption">>;

export enum Words {
  ScreenSize = 769,
  MobWords = 36,
  TabletWords = 88,
}
