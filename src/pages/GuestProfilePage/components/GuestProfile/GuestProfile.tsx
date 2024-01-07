import { FC, useEffect, useState } from "react";
import styles from "./GuestProfile.module.scss";
import GuestProfileInfo from "./GuestProfileInfo/GuestProfileInfo";
import { BookShelf, IconEnum, UIbutton } from "@/src/components";
import { useParams } from "react-router";
import guestProfileApi from "../GuestProfileApi/guestProfileApi";
import { followApi } from "@/src/axios";
import subscribersApi from "../GuestProfileApi/subscribersApi";

const GuestProfile: FC = () => {
  const { Id } = useParams();
  const [enemyData, setEnemyData] = useState();
  const [enemyDatafollowersIncludeId, setEnemyDatafollowersIncludeId] =
    useState(false);

  const fetchEnemyUserData = async (Id: string | number | undefined) => {
    const response = await guestProfileApi(Id);
    setEnemyData(response.data);
  };

  const followingList = async () => {
    const { data } = await subscribersApi();

    setEnemyDatafollowersIncludeId(
      data.myFollow.some((item: any) => item.id.toString() === Id)
    );
  };

  const subscribe = async () => {
    const response = await followApi(Id);

    fetchEnemyUserData(Id);
  };

  useEffect(() => {
    fetchEnemyUserData(Id);
    followingList();
    console.log(enemyData);
  }, []);
  return (
    <div className={styles["profile-conteiner"]}>
      <GuestProfileInfo data={enemyData} />
      {
        <UIbutton
          icon={IconEnum.UserAdd}
          onClick={subscribe}
          id="follow"
          className={styles["button-follow"]}
          fullWidth
          size="medium"
          color="primary"
          dataAutomation="FollowButton"
        >
          {enemyDatafollowersIncludeId === true ? "unfollow" : "follow"}
        </UIbutton>
      }
      <BookShelf />
    </div>
  );
};

export default GuestProfile;
