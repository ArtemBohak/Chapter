import { FeedComponentProps } from "../../FeedComponent/FeedComponent.type";

export type UserNickNameProps = Pick<FeedComponentProps, "nickName"> & {
  classNames?: string;
};
