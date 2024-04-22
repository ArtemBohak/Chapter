import { FC, useState } from "react";
import styles from "./MessagesPage.module.scss";
import { Chat, DashBoard } from "./components";

const MessagesPage: FC = () => {
  const [currentChat, setCurrentChat] = useState<number | null>(null);

  return (
    <section className={styles["messages"]}>
      <div className={styles["container"]}>
        {currentChat !== null ? (
          <Chat setCurrentChat={setCurrentChat} />
        ) : (
          <DashBoard
            setCurrentChat={setCurrentChat}
            currentChat={currentChat}
          />
        )}
      </div>
    </section>
  );
};

export default MessagesPage;
