import { FC, useRef } from "react";

import { useEditField } from "../../hooks";
import { UserNameProps } from "./UserName.type";
import styles from "./UserName.module.scss";

import IconButton from "../IconButton/IconButton";

const UserName: FC<UserNameProps> = ({ firstName, lastName }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    isEditing,
    value,
    onHandleEdit,
    onHandleSave,
    onHandleChange,
    onHandleFocus,
  } = useEditField(firstName + " " + lastName, inputRef, false);
  const inputValue = value ? value : "";

  return (
    <>
      <IconButton
        isEditing={isEditing}
        onHandleEdit={onHandleEdit}
        onHandleSave={onHandleSave}
      />
      <label className={styles["info-label"]}>
        <span className={styles["info-label__text"]}>Full Name</span>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={onHandleChange}
          className={styles["info-label__input"]}
          disabled={!isEditing}
          onFocus={onHandleFocus}
          data-automation="userNameInput"
        />
      </label>
    </>
  );
};

export default UserName;
