import { FC } from "react";
import styles from "./Posts.module.scss";

const Posts: FC = () => {
  return (
    <div className={styles["posts-wrapper"]}>
      {[...new Array(5)].map((lk, index) => (
        <div
          key={index}
          className="w-[670px] h-[800px] bg-purple-400 m-1"
        ></div>
      ))}
    </div>
  );
};

export default Posts;
