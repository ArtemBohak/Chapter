import { FC } from "react";
import { LikesProps } from "./Likes.type";

import Like from "../Like/Like";

const Likes: FC<LikesProps> = ({ likesData = [] }) => {
  return (
    <ul>
      {likesData.map((i) => (
        <li key={i.id}>
          <Like {...i} />
        </li>
      ))}
    </ul>
  );
};

export default Likes;
