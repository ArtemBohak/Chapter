import { FC, useRef } from "react";

import { useEditField } from "../../hooks";
import { UserStatusProps } from "./UserStatus.type";
import styles from "./UserStatus.module.scss";

import IconButton from "../IconButton/IconButton";

const UserStatus: FC<UserStatusProps> = ({ userStatus }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isEditing,
    value,
    onHandleEdit,
    onHandleSave,
    onHandleChange,
    onHandleFocus,
  } = useEditField(userStatus, textareaRef, true);
  const inputValue = value ? value : "";
  return (
    <>
      <IconButton
        isEditing={isEditing}
        onHandleEdit={onHandleEdit}
        onHandleSave={onHandleSave}
      />
      <textarea
        className={styles["status-text"]}
        ref={textareaRef}
        value={inputValue}
        disabled={!isEditing}
        onChange={onHandleChange}
        onFocus={onHandleFocus}
        data-automation="userStoryTextArea"
      />
    </>
  );
};

export default UserStatus;
