import { FC } from "react";

import { PostProps } from "./Post.type";

import { FeedComponent } from "./components";

const Post: FC<PostProps> = ({ pageVariant, ...props }) => {
  if (pageVariant === "feed") return <FeedComponent {...props} />;

  return null;
};

export default Post;
