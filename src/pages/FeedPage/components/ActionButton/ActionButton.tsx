import { FC, useMemo, useState } from "react";
import cn from "classnames";

import { ActionButtonProps } from "./ActionButton.type";

import styles from "./ActionButton.module.scss";

import { Icon } from "@/src/components";

const ActionButton: FC<ActionButtonProps> = ({
  id,
  clickedList,
  value,
  iconType,
  size = 28,
}) => {
  const clicked = useMemo(
    () =>
      clickedList.some((i) => {
        return i === id;
      }),
    [clickedList, id]
  );

  const [isClicked, setIsClicked] = useState(clicked);

  const onHandleClick = () => {
    setIsClicked(!isClicked);
  };
  const mainClass = cn({
    [`${styles["button__icon"]}`]: !isClicked,
    [`${styles["button__icon--clicked"]}`]: isClicked,
  });

  return (
    <button onClick={onHandleClick} className={styles["button"]}>
      <Icon
        className={mainClass}
        icon={iconType}
        size={size}
        removeInlineStyle={true}
      />
      <span>{value}</span>
    </button>
  );
};

export default ActionButton;
