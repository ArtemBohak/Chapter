import { FC } from "react";

import styles from "./UserInfo.module.scss";

const firstName = "Mattew";
const lastName = "Downroy";

const UserInfo: FC = () => {
  return (
    <div className={styles["container"]}>
      <p className={styles["title"]}>Full Name</p>
      <p className={styles["text"]}>
        {firstName} {lastName}
      </p>
    </div>
  );
};

export default UserInfo;
