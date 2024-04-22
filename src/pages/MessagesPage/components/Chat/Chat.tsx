import { FC } from "react";

import { useSwipe } from "@/src/hooks";
import { useAppSelector } from "@/src/redux";

import { Field, Room } from "../";
import { ChatProps } from "./Chat.type";
import styles from "./Chat.module.scss";

const Chat: FC<ChatProps> = ({ setCurrentChat, room }) => {
  const { avatarUrl, firstName, lastName, nickName, id } = room;
  const userAvatar = useAppSelector((state) => state.userSlice.user.avatarUrl);
  useSwipe({ leftSwipeCB: () => setCurrentChat(null), enableSwipe: true });

  const onChange = (value: string) => {
    console.log(value);
  };
  return (
    <div className={styles["chat"]}>
      <Room
        id={id}
        avatarUrl={avatarUrl}
        firstName={firstName}
        lastName={lastName}
        nickName={nickName}
      />
      <div className={styles["chat__messages"]}>
        <div className={styles["wrapper"]}>
          <div className={styles["messages"]}></div>
          <Field onChange={onChange} />
          <img
            src={userAvatar}
            width={52}
            height={52}
            className={styles["avatar"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
