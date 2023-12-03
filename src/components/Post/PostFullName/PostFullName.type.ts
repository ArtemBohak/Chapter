import { PostProps } from "../Post.type";

export type PostFullNameProps = Pick<PostProps, "firstName" | "lastName">;
