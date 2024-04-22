import { FC } from "react";

import { useSwipe } from "@/src/hooks";
import { useAppSelector } from "@/src/redux";

import { Field, Message, Room } from "../";
import { ChatProps } from "./Chat.type";
import styles from "./Chat.module.scss";
import { MessageType } from "@/src/types";

const messages: MessageType[] = [
  {
    date: Date.now(),
    message:
      "Embracing life's journey with open arms and a heart full of gratitude. Chasing dreams, one step at a time, with unwavering determination. Spreading positivity and kindness wherever I go, making the world a better place.",
    ownerId: 32,

    id: 12,
  },
  {
    date: Date.now(),
    message:
      "Embracing life's journey with open arms and a heart full of gratitude. Chasing dreams, one step at a time, with unwavering determination. Spreading positivity and kindness wherever I go, making the world a better place.",

    id: 14,
    ownerId: 48,
  },
];

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
        <ul className={styles["messages"]}>
          {messages.map((message) => (
            <li key={message.id}>
              <Message {...message} />
            </li>
          ))}
        </ul>
        <div className={styles["wrapper"]}>
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
