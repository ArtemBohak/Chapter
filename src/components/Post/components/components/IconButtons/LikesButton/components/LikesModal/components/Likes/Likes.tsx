import { FC, useMemo } from "react";

import { LikesProps } from "./Likes.type";
import styles from "./Likes.module.scss";

import { Like } from "./components";
import { useAppSelector } from "@/src/redux";

const Likes: FC<LikesProps> = ({ likesData = [], ...props }) => {
  const {
    user: { id },
  } = useAppSelector((state) => state.userSlice);

  const likes = useMemo(
    () => likesData.filter((i) => i.id !== id),
    [id, likesData]
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
