import { FC } from "react";

import { UserNickNameProps } from "./UserNickName.type";
import styles from "./UserNickName.module.scss";

const UserNickName: FC<UserNickNameProps> = ({ nickName, classNames }) => (
  <p className={`${styles["nickname"]} ${classNames}`}>{nickName}</p>
);

export default UserNickName;
