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
  const onHandleClick = () => {
    if (isEditing) return onHandleSave();
    onHandleEdit();
  };
  return (
    <>
      <button
        onClick={onHandleClick}
        data-automation="clickButton"
        className={`${styles["icon"]} ${classNames}`}
      >
        {isEditing ? (
          <Icon icon={IconEnum.Save} />
        ) : (
          <Icon icon={IconEnum.Edit} />
        )}
      </button>
    </>
  );
};

export default IconButton;
