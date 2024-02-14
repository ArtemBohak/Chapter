import { FC, useMemo } from "react";

import { LikesProps } from "./Likes.type";
import styles from "./Likes.module.scss";

import { Like } from "./components";
import { useAppSelector } from "@/src/redux";

const Likes: FC<LikesProps> = (props) => {
  const {
    user: { id },
  } = useAppSelector((state) => state.userSlice);

  const likes = useMemo(
    () => props.likesData.filter((i) => i.id !== id),
    [id, props.likesData]
  );
  return (
    <ul className={styles["likes-list"]}>
      {likes.map((i) => (
        <li key={i.id}>
          <Like {...i} {...props} />
        </li>
      ))}
    </ul>
  );
};

export default Likes;
