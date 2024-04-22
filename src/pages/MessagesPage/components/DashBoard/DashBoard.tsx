import { FC } from "react";
import styles from "./DashBoard.module.scss";
import { useAppSelector } from "@/src/redux";
import { Room } from "./components";
import { DashBoardProps } from "./DashBoard.type";

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

const DashBoard: FC<DashBoardProps> = ({ currentChat, setCurrentChat }) => {
  const { firstName, lastName } = useAppSelector(
    (state) => state.userSlice.user
  );

  const onHandleClick = (id: number) => {
    setCurrentChat(id);
  };

  return (
    <div className={styles["dashboard"]}>
      <h2 className={styles["full-name"]}>
        {firstName} {lastName}
      </h2>
      <p className={styles["label"]}>Messages</p>
      <ul className={styles["rooms"]}>
        {rooms.map((room, i) => (
          <li key={i}>
            <Room
              {...room}
              active={room.id === currentChat}
              handleClick={onHandleClick}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashBoard;
