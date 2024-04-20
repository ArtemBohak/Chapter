import { FC } from "react";
import styles from "./DashBoard.module.scss";
import { useAppSelector } from "@/src/redux";
import { RoomProps } from "./DashBoard.type";

const Room: FC<RoomProps> = ({
  avatarUrl,
  nickName,
  firstName,
  lastName,
}) => {};

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
      <div className={styles["rooms"]}></div>
    </div>
  );
};

export default DashBoard;
