import { FC } from "react";
import { useParams } from "react-router-dom";

const PostPage: FC = () => {
  const { postId } = useParams();
  return <div className="pl-[80px] pt-[140px]">{postId}</div>;
};

export default PostPage;
