import { PostProps } from "../Post.type";

export type AvatarProps = Required<Pick<PostProps, "avatar">>;
