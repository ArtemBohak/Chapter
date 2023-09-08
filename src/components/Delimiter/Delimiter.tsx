import { FC } from "react";
import cn from "classnames";
import { type DelimiterProps } from "./delimiter.type";
import styles from "./Delimiter.module.scss";

const Delimiter: FC<DelimiterProps> = ({ text = "or", className }) => {
  return (
    <div className={styles["delimiter"]}>
      <p className={cn(styles["delimiter__line"], className)}>{text}</p>
    </div>
  );
};

export default Delimiter;
