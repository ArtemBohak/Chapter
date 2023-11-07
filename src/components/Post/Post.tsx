import { FC } from "react";

import { PostProps } from "./Post.type";

import { PostComponent, FeedComponent } from "./components";

const Post: FC<PostProps> = ({ pageVariant, ...props }) => {
  if (pageVariant === "feed")
    return <FeedComponent {...props} pageVariant={pageVariant} />;

  return <PostComponent {...props} pageVariant={pageVariant} />;
};

export default Post;
