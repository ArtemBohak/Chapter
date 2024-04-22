import { FC } from "react";
import cn from "classnames";

import { RoomProps } from "../DashBoard.type";
import styles from "./Room.module.scss";
import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Room: FC<RoomProps> = ({
  avatarUrl,
  nickName,
  firstName,
  lastName,
  active,
}) => {
  const btnClassNames = cn(styles["room"], { [styles["active"]]: active });

  return (
    <button className={btnClassNames}>
      <img
        src={avatarUrl || defaultUserAvatar}
        alt="user avatar"
        width={52}
        height={52}
        className={styles["room__image"]}
      />
      <span className={styles["room__text"]}>
        <span className={styles["full-name"]}>
          {firstName} {lastName}
        </span>
        <span className={styles["nickname"]}>{nickName}</span>
      </span>
    </button>
  );
};

export default Room;
