import { PostProps } from "../../Post.type";

export type FeedComponentProps = Omit<PostProps, "pageVariant">;
