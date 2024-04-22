import { FC, useEffect, useState } from "react";
import cn from "classnames";

import { RoomProps } from "./Room.type";
import styles from "./Room.module.scss";
import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Room: FC<RoomProps> = ({
  avatarUrl,
  nickName,
  firstName,
  lastName,
  active,
  newMessage,
  id,
  handleClick,
}) => {
  const [unreadMessage, setUnreadMessage] = useState(newMessage);

  useEffect(() => {
    setUnreadMessage(newMessage);
  }, [newMessage]);

  const onClick = () => {
    setUnreadMessage(false);
    handleClick(id);
  };

  const btnClassNames = cn(styles["room"], {
    [styles["active"]]: active,
    [styles["unread"]]: unreadMessage,
  });

  return (
    <button className={btnClassNames} onClick={onClick}>
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
