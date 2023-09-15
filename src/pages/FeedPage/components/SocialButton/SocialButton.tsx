import { FC, useState } from "react";
import cn from "classnames";

import { useArrayOfId } from "@/src/hooks";
import { SocialButtonProps } from "./SocialButton.type";
import styles from "./SocialButton.module.scss";

import { Icon } from "@/src/components";

const SocialButton: FC<SocialButtonProps> = ({
  id,
  value,
  clickedList,
  iconType,
  size = 28,
}) => {
  const [clicked] = useArrayOfId(id, clickedList);
  const [isClicked, setIsClicked] = useState(clicked);

  const onHandleClick = () => {
    setIsClicked(!isClicked);
  };
  const mainClass = cn(styles["button__icon"], {
    [`${styles["button__icon--normal"]}`]: !isClicked,
    [`${styles["button__icon--clicked"]}`]: isClicked,
  });

  return (
    <button onClick={onHandleClick} className={styles["button"]}>
      <span>
        <Icon
          className={mainClass}
          icon={iconType}
          size={size}
          removeInlineStyle={true}
          disableFill
        />
      </span>
      <span>{value}</span>
    </button>
  );
};

export default SocialButton;
