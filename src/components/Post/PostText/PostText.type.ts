import { PostProps } from "../Post.type";

export type PostTextProps = {
  isLimit?: boolean;
} & Required<Pick<PostProps, "caption">>;

export enum Words {
  ScreenSize = 769,
  MobWords = 36,
  TabletWords = 88,
}
