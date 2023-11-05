import { PostProps } from "../../Post.type";

export type UserProps = Pick<PostProps, "avatar" | "nickName">;
