import { PostProps } from "../Post.type";

export type PostTextProps = Pick<PostProps, "caption"> & {
  isLimit?: boolean;
};

export enum Words {
  ScreenSize = 769,
  MobWords = 36,
  TabletWords = 88,
}
