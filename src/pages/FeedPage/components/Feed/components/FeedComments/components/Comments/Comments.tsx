import { FC } from "react";

import { CommentsProps } from "./Comments.type";
import Comment from "../Comment/Comment";

const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <>
      <ul>
        {comments.map((i) => (
          <li key={i.id}>
            <Comment {...i} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
