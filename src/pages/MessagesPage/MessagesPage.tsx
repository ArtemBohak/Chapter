import { FC, useState } from "react";
import styles from "./MessagesPage.module.scss";
import { Chat, DashBoard } from "./components";

const rooms = [
  {
    avatarUrl: null,
    firstName: "John",
    lastName: "Doe",
    nickName: "user1",
    id: 0,
    newMessage: false,
  },
  {
    avatarUrl: null,
    firstName: "Jack",
    lastName: "Ryan",
    nickName: "user2",
    id: 1,
    newMessage: true,
  },
  {
    avatarUrl: null,
    firstName: "Jimmy",
    lastName: "Shit",
    nickName: "user3",
    id: 2,
    newMessage: true,
  },
];

const MessagesPage: FC = () => {
  const [currentChat, setCurrentChat] = useState<number | null>(null);

  return (
    <section className={styles["messages"]}>
      <div className={styles["container"]}>
        {currentChat !== null ? (
          <Chat setCurrentChat={setCurrentChat} room={rooms[currentChat]} />
        ) : (
          <DashBoard
            rooms={rooms}
            setCurrentChat={setCurrentChat}
            currentChat={currentChat}
          />
        )}
      </div>
    </section>
  );
};

export default MessagesPage;
