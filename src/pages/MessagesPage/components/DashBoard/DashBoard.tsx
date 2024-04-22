import { FC } from "react";
import styles from "./DashBoard.module.scss";
import { useAppSelector } from "@/src/redux";
import Room from "./Room/Room";

const currentRoom = 0;

const rooms = [
  {
    avatarUrl: null,
    firstName: "John",
    lastName: "Doe",
    nickName: "user1",
    roomId: 0,
  },
  {
    avatarUrl: null,
    firstName: "Jack",
    lastName: "Ryan",
    nickName: "user2",
    roomId: 1,
  },
  {
    avatarUrl: null,
    firstName: "Jimmy",
    lastName: "Shit",
    nickName: "user3",
    roomId: 2,
  },
];

const DashBoard: FC = () => {
  const { firstName, lastName } = useAppSelector(
    (state) => state.userSlice.user
  );
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
              id={room.roomId}
              active={room.roomId === currentRoom}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashBoard;
