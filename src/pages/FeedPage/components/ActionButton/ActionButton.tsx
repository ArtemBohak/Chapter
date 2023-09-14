import { FC, useEffect, useState } from "react";

import { ActionButtonProps } from "./ActionButton.type";
import { IconEnum } from "@/src/components/Icon";
import styles from "./ActionButton.module.scss";

import { Icon } from "@/src/components";

const ActionButton: FC<ActionButtonProps> = ({
  id,
  iconType,
  value,
  clickedList,
  size = 28,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(clickedList.some((item) => item === id));
  }, [clickedList, id]);

  const onHandleClick = () => {
    setIsClicked(!isClicked);
    isClicked && clickedList.filter((item) => item !== id);
    !isClicked && clickedList.push(id);
  };
  return (
    <button onClick={onHandleClick} className={styles["button"]}>
      <Icon
        className={`${
          isClicked ? styles["button__icon--clicked"] : styles["button__icon"]
        }`}
        icon={iconType}
        size={size}
        removeInlineStyle={true}
        style={iconType === IconEnum.Likes ? {} : undefined}
      />
      <span>{value}</span>
    </button>
  );
};

export default ActionButton;
