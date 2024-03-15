import { FC } from "react";

import { IconButtonProps } from "./IconButton.type";
import styles from "./IconButton.module.scss";

import { Icon, IconEnum } from "@/src/components";

const IconButton: FC<IconButtonProps> = ({
  isEditing,
  classNames,
  isLoading,
  onHandleEdit,
  onHandleSave,
}) => {
  const onHandleClick = () => {
    if (isEditing) return onHandleSave && onHandleSave();
    onHandleEdit();
  };
  return (
    <button
      onClick={onHandleClick}
      data-automation="clickButton"
      className={`${styles["icon"]} ${classNames}`}
      disabled={isLoading}
      aria-label="Edit user data button"
    >
      {isEditing ? (
        <Icon icon={IconEnum.Save} />
      ) : (
        <Icon icon={IconEnum.Edit} />
      )}
    </button>
  );
};

export default IconButton;
