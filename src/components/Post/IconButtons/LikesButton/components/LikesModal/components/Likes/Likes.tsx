import { FC } from "react";

import { LikesProps } from "./Likes.type";
import styles from "./Likes.module.scss";

import { Like } from "./components";
import { useAppSelector } from "@/src/redux";

const Likes: FC<LikesProps> = (props) => {
  const {
    user: { id },
  } = useAppSelector((state) => state.userSlice);

  const likes = props.likesData.filter((i) => i.userId !== id);
  return (
    <ul className={styles["likes-list"]}>
      {likes.map((i) => (
        <li key={i.userId}>
          <Like {...i} {...props} />
        </li>
      ))}
    </ul>
  );
};

export default Likes;
