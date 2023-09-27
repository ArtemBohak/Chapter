import { FC, useRef } from "react";

import { useEditField } from "../../hooks";
import styles from "./UserStory.module.scss";

import IconButton from "../IconButton/IconButton";

const text =
  "Embracing life's journey with open arms and a heart full of gratitude. Chasing dreams, one step at a time, with unwavering determination. Spreading positivity and kindness wherever I go, making the world a better place.";

const UserStory: FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isEditing, value, onHandleEdit, onHandleSave, onHandleChange } =
    useEditField(text, textareaRef);

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
        value={value}
        disabled={!isEditing}
        onChange={onHandleChange}
        data-automation="userStoryTextArea"
      />
    </>
  );
};

export default UserStory;
