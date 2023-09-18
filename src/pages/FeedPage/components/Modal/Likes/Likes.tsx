import { FC, useState } from "react";

import { useAppSelector } from "@/src/redux/hooks";
import { useArrayOfId } from "@/src/hooks";
import { LikesParams } from "./Likes.type";
import styles from "./Likes.module.scss";

import { UIbutton } from "@/src/components";

const Likes: FC<LikesParams> = ({ avatar, name, id, followList }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [isFollowing] = useArrayOfId(user.id + 1 + "", followList);
  const [isFollow, setIsFollow] = useState(isFollowing);

  const onHandleClick = () => {
    setIsFollow(!isFollow);
    console.log(id);
  };
  return (
    <>
      <div className={styles["likes"]}>
        <div className={styles["likes__content"]}>
          <img
            src={avatar}
            alt=""
            width="38"
            className={styles["likes__content-image"]}
          />
          <img
            src={avatar}
            alt=""
            width="78"
            className={styles["likes__content-image-tab"]}
          />
          <p>{name}</p>
        </div>
        <UIbutton
          variant={isFollow ? "outlined" : "contained"}
          onClick={onHandleClick}
          dataAutomation="clickButton"
          className={styles["likes__button"]}
        >
          {isFollow ? "Unfollow" : "Follow"}
        </UIbutton>
      </div>
    </>
  );
};

export default Likes;
