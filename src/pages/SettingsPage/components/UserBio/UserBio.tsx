import { FC, useRef, useState } from "react";

import styles from "./UserBio.module.scss";

import IconButton from "../IconButton/IconButton";

const text =
  "Embracing life's journey with open arms and a heart full of gratitude. Chasing dreams, one step at a time, with unwavering determination. Spreading positivity and kindness wherever I go, making the world a better place.";

const UserBio: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(text);
  const textareaRef = useRef(null);
  const cursorPosition = text.length;

  const onHandleEdit = () => {
    setIsEditing(true);
    textareaRef.current && textareaRef.current.focus();
    textareaRef.current &&
      textareaRef.current.setSelectionRange(0, text.length);
  };
  console.log(text.length / 35);
  const onHandleSave = () => {
    setIsEditing(false);
    console.log(textValue);
  };
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
        value={textValue}
        rows={Math.floor(text.length / 33)}
        disabled={!isEditing}
      />
    </>
  );
};

export default UserBio;
