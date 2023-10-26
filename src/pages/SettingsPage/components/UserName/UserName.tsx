import { FC, useRef } from "react";
import cn from "classnames";

import { checkIsCyrillic } from "@/src/utils";

import { useEditField } from "../../hooks";
import { UserNameProps } from "./UserName.type";
import styles from "./UserName.module.scss";

import IconButton from "../IconButton/IconButton";

const UserName: FC<UserNameProps> = ({ firstName, lastName }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isEditing, value, onHandleEdit, onHandleSave, onHandleChange } =
    useEditField(firstName + " " + lastName, inputRef, false);

  const inputValue = value ? value : "";
  const inputClassName = cn(styles["info-label__input"], {
    ["cyrillic"]: checkIsCyrillic(inputValue),
  });
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
          className={inputClassName}
          onChange={onHandleChange}
          disabled={!isEditing}
          data-automation="userNameInput"
        />
      </label>
    </>
  );
};

export default UserName;
