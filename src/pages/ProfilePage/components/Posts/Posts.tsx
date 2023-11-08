import { FC } from "react";
import styles from "./Posts.module.scss";

const Posts: FC = () => {
  return (
    <div className={styles["posts-wrapper"]}>
      {[...new Array(0)].map((post, index) => (
        <div
          key={index}
          className="max-w-[670px] min-w-[320px] h-[800px] bg-purple-400 m-1"
        ></div>
      ))}
    </div>
  );
};

export default Posts;
