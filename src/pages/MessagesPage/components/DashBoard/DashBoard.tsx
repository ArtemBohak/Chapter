import { FC } from "react";
import styles from "./DashBoard.module.scss";
import { useAppSelector } from "@/src/redux";
import { Room } from "../";
import { DashBoardProps } from "./DashBoard.type";

const DashBoard: FC<DashBoardProps> = ({
  currentChat,
  rooms,
  setCurrentChat,
}) => {
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
