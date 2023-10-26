import { FC } from "react";
import styles from "./Liked.module.scss";

const Liked: FC = () => {
  return (
    <div className={styles["liked-wrapper"]}>
      {[...new Array(10)].map((lk) => (
        <div className="w-[670px] h-[800px] bg-emerald-600 m-2"></div>
      ))}
    </div>
  );
};

export default Liked;
