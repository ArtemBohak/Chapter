import { FC, useState } from "react";
import cn from "classnames";

import { useEditField } from "../../hooks";
import { UserNameProps } from "./UserName.type";

import styles from "./UserName.module.scss";

import IconButton from "../IconButton/IconButton";
import { NameForm } from "./components";

const UserName: FC<UserNameProps> = ({ firstName, lastName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isEditing, setIsEditing } = useEditField("fullName");

  const fieldClassName = cn(styles["name"], {
    [styles["form-is-shown"]]: isEditing,
  });

  return (
    <>
      <IconButton
        isEditing={isEditing}
        onHandleEdit={() => setIsEditing(true)}
        onHandleSave={() => setIsEditing(false)}
        isLoading={isLoading}
      />
      <div className={fieldClassName}>
        <p className={styles["name__title"]}>Full Name</p>
        {isEditing ? (
          <NameForm
            fullName={firstName + " " + lastName}
            setIsEditing={setIsEditing}
            setIsLoading={setIsLoading}
          />
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
