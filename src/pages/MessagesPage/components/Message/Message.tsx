import { FC } from "react";
import cn from "classnames";

import { MessageProps } from "./Message.type";
import styles from "./Message.module.scss";
import { convertDate } from "@/src/utils";
import { useAppSelector } from "@/src/redux";

const Message: FC<MessageProps> = ({ message, date, ownerId }) => {
  const userId = useAppSelector((state) => state.userSlice.user.id);
  const messageClassNames = cn(styles["message__content"], {
    [styles["incoming"]]: userId !== ownerId,
  });

  const dateClassNames = cn(styles["date"], {
    [styles["incoming"]]: userId !== ownerId,
  });

  return (
    <div className={styles["message"]}>
      <div className={messageClassNames}>
        <p className={dateClassNames}>{convertDate(date)}</p>
        <p className={styles["text"]}>{message}</p>
      </div>
    </div>
  );
};

export default Message;
