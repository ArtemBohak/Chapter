import { FC, useRef } from "react";

import { useEditField } from "../../hooks";
import styles from "./UserName.module.scss";

import IconButton from "../IconButton/IconButton";

const fullName = "Mattew Downroy";

const UserName: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isEditing, value, onHandleEdit, onHandleSave, onHandleChange } =
    useEditField(fullName, inputRef);
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
          value={value}
          className={styles["info-label__input"]}
          onChange={onHandleChange}
          disabled={!isEditing}
          data-automation="userName"
        />
      </label>
    </>
  );
};

export default UserName;
