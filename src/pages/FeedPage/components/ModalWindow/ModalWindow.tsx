import { FC, useState } from "react";

import { useAppSelector } from "@/src/redux/hooks";
import { useArrayOfId } from "@/src/hooks";
import { LikesParams } from "./ModalWindow.type";
import styles from "./ModalWindow.module.scss";

import { UIbutton } from "@/src/components";

const ModalWindow: FC<LikesParams> = ({ avatar, name, id, followList }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [isFollowing] = useArrayOfId(user.id + 1 + "", followList);
  const [isFollow, setIsFollow] = useState(isFollowing);

  const onHandleClick = () => {
    setIsFollow(!isFollow);
    console.log(id);
  };
  return (
    <div className={styles["likes"]}>
      <img src={avatar} alt="" width="38" />
      <p>{name}</p>
      <UIbutton
        variant={isFollow ? "outlined" : "contained"}
        onClick={onHandleClick}
        dataAutomation="clickButton"
      >
        {isFollow ? "Unfollow" : "Follow"}
      </UIbutton>
    </div>
  );
};

export default ModalWindow;
