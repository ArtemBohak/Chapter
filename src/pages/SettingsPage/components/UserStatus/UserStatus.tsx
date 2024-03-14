import { FC, useRef, useState } from "react";

import { useEditField } from "../../hooks";
import { UserStatusProps } from "./UserStatus.type";
import styles from "./UserStatus.module.scss";

import IconButton from "../IconButton/IconButton";

const UserStatus: FC<UserStatusProps> = ({ userStatus }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isEditing,
    value,
    error,
    onHandleEdit,
    onHandleSave,
    onHandleChange,
    onHandleFocus,
  } = useEditField("status", userStatus, setIsLoading, textareaRef);
  const inputValue = value ? value : "";

  return (
    <>
      <IconButton
        isEditing={isEditing}
        onHandleEdit={onHandleEdit}
        onHandleSave={onHandleSave}
        isLoading={isLoading}
      />
      <textarea
        className={styles["status"]}
        ref={textareaRef}
        value={inputValue}
        disabled={!isEditing}
        onChange={onHandleChange}
        onFocus={onHandleFocus}
        data-automation="userStoryTextArea"
      />
      {error && <p className={styles["error"]}>{error}</p>}
    </>
  );
};

export default UserStatus;
