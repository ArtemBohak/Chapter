import { FC } from "react";

import { IconButtonProps } from "./IconButton.type";
import styles from "./IconButton.module.scss";

import { Icon, IconEnum } from "@/src/components";

const IconButton: FC<IconButtonProps> = ({
  isEditing = true,
  onHandleEdit,
  onHandleSave,
  classNames,
}) => {
  return (
    <>
      {isEditing ? (
        <button
          onClick={onHandleSave}
          className={`${styles["icon-button"]} ${classNames}`}
          data-automation="clickButton"
        >
          <Icon icon={IconEnum.Save} className={styles["icon"]} />
        </button>
      ) : (
        <button
          onClick={onHandleEdit}
          className={`${styles["icon-button"]} ${classNames}`}
          data-automation="clickButton"
        >
          <Icon icon={IconEnum.Edit} className={styles["icon"]} />
        </button>
      )}
    </>
  );
};

export default IconButton;
