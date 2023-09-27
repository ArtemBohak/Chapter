import { FC } from "react";

import { IconButtonProps } from "./IconButton.type";
import styles from "./IconButton.module.scss";

import { Icon, IconEnum } from "@/src/components";

const IconButton: FC<IconButtonProps> = ({
  isEditing,
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
          <Icon icon={IconEnum.Save} />
        </button>
      ) : (
        <button
          onClick={onHandleEdit}
          className={`${styles["icon-button"]} ${classNames}`}
          data-automation="clickButton"
        >
          <Icon icon={IconEnum.Edit} />
        </button>
      )}
    </>
  );
};

export default IconButton;
