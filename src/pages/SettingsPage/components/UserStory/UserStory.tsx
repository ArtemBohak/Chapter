import { FC, useRef } from "react";

import { useEditField } from "../../hooks";
import IconButton from "../IconButton/IconButton";
import { UserStoryProps } from "./UserStory.type";
import styles from "./UserStory.module.scss";

const UserStory: FC<UserStoryProps> = ({ userStatus }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isEditing, value, onHandleEdit, onHandleSave, onHandleChange } =
    useEditField(userStatus, textareaRef, true);
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
        data-automation="userStoryTextArea"
      />
    </>
  );
};

export default UserStory;
