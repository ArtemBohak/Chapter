import { FC } from "react";

import styles from "./UserInfo.module.scss";

import IconButton from "../IconButton/IconButton";

const fullName = "Mattew Downroy";

const UserInfo: FC = () => {
  return (
    <div className={styles["info-container"]}>
      <IconButton />
      <p className={styles["info-container__title"]}>Full Name</p>
      <p className={styles["info-container__text"]}>{fullName}</p>
    </div>
  );
};

export default UserInfo;
