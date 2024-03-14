import { FC } from "react";
import cn from "classnames";

import { useEditField } from "../../hooks";
import { UserNameProps } from "./UserName.type";

import styles from "./UserName.module.scss";

import IconButton from "../IconButton/IconButton";
import { NameForm } from "./components";

const UserName: FC<UserNameProps> = ({ firstName, lastName }) => {
  // const inputRef = useRef<HTMLInputElement>(null);
  const { isEditing, onHandleEdit, onHandleSave } = useEditField("fullName");
  // const inputValue = value ? value : "";

  const fieldClassName = cn(styles["name"], {
    [styles["form-is-hide"]]: !isEditing,
  });
  return (
    <>
      <IconButton
        isEditing={isEditing}
        onHandleEdit={onHandleEdit}
        onHandleSave={onHandleSave}
      />
      <div className={fieldClassName}>
        <p className={styles["name__title"]}>Full Name</p>
        {isEditing ? (
          <NameForm />
        ) : (
          <p className={styles["name__text"]}>
            {firstName} {lastName}
          </p>
        )}
      </div>
    </>
  );
};

export default UserName;
// <label className={styles["info"]}>
//   <span className={styles["info__text"]}>Full Name</span>
//   <input
//     ref={inputRef}
//     value={inputValue}
//     onChange={onChange}
//     className={styles["info__input"]}
//     disabled={!isEditing}
//     onFocus={onHandleFocus}
//     data-automation="userNameInput"
//   />
// </label>;
