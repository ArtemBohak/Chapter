import { FC, useState } from "react";

import { useAppSelector } from "@/src/redux/hooks";
import { useFindById } from "@/src/hooks";
import { ItemParams } from "./Item.type";
import styles from "./Item.module.scss";

import { UIbutton } from "@/src/components";

const Item: FC<ItemParams> = ({ avatar, name, id, dataList }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [isFollowing] = useFindById(user.id + 1 + "", dataList);

  const [isFollow, setIsFollow] = useState(isFollowing);

  const onHandleClick = () => {
    setIsFollow(!isFollow);
    console.log(id);
  };

  return (
    <div className={styles["item"]}>
      <div className={styles["item__content"]}>
        <img
          src={avatar}
          alt=""
          width="38"
          className={styles["item__content-image"]}
        />
        <img
          src={avatar}
          alt=""
          width="78"
          className={styles["item__content-image-tab"]}
        />
        <p>{name}</p>
      </div>
      <UIbutton
        variant={isFollow ? "outlined" : "contained"}
        onClick={onHandleClick}
        dataAutomation="clickButton"
        className={styles["item__button"]}
      >
        {isFollow ? "Unfollow" : "Follow"}
      </UIbutton>
    </div>
  );
};

export default Item;
