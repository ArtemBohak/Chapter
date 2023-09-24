import { FC } from "react";

import styles from "./UserInfo.module.scss";

const firstName = "Mattew";
const lastName = "Downroy";

const UserInfo: FC = () => {
  return (
    <div className={styles["info-container"]}>
      <p className={styles["info-container__title"]}>Full Name</p>
      <p className={styles["info-container__text"]}>
        {firstName} {lastName}
      </p>
    </div>
  );
};

export default UserInfo;
