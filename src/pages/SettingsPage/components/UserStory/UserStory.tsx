import { FC, useRef } from "react";

import { useEditField } from "../../hooks";
import { UserStoryProps } from "./UserStory.type";
import styles from "./UserStory.module.scss";

import IconButton from "../IconButton/IconButton";

const UserStory: FC<UserStoryProps> = ({ userStatus }) => {
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
        className={styles["bio-text"]}
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

export default UserStory;
