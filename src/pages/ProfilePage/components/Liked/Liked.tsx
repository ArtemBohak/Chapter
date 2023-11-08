import { FC } from "react";
import styles from "./Liked.module.scss";

const Liked: FC = () => {
  return (
    <div className={styles["liked-wrapper"]}>
      {[...new Array(10)].map((like, index) => (
        <div
          key={index}
          className="max-w-[670px] min-w-[320px] h-[800px] bg-orange m-2"
        ></div>
      ))}
    </div>
  );
};

export default Liked;
