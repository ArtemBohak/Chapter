import { FC } from "react";
import styles from "./Switch.module.scss";

const Switch: FC = () => {
  return (
    <label className={styles["switch"]}>
      <input type="checkbox" />
      <i></i>
    </label>
  );
};

export default Switch;
