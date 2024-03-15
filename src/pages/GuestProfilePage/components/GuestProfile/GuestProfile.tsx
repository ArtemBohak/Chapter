import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./GuestProfile.module.scss";
import GuestProfileInfo from "./GuestProfileInfo/GuestProfileInfo";
import { BookShelf, IconEnum, UIbutton } from "@/src/components";
import guestProfileApi from "../GuestProfileApi/guestProfileApi";
import { followApi } from "@/src/axios";
import { enemyData } from "./GuestProfile.type";
import { useErrorBoundary } from "@/src/hooks";

const GuestProfile: FC = () => {
  const { Id } = useParams();
  const [enemyData, setEnemyData] = useState<enemyData>();
  const [BooksCheker, setbooksCheker] = useState(false);
  const [subscribeIsLoading, setSubscribeIsLoading] = useState(false);
  const setErrorBoundary = useErrorBoundary();
  const navigate = useNavigate();

  const fetchEnemyUserData = async (Id: string | number | undefined) => {
    const response = await guestProfileApi(Id, navigate, setErrorBoundary);
    setEnemyData(response.data);
    console.log(enemyData);
    if (response.data.userBooks.length > 0) {
      setbooksCheker(true);
    }
  };

  const subscribe = async () => {
    setSubscribeIsLoading(true);
    try {
      await followApi(Id);
      fetchEnemyUserData(Id);
    } catch (error) {
      console.log(error);
    } finally {
      setSubscribeIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnemyUserData(Id);
  }, []);
  return (
    <div className={styles["profile-conteiner"]}>
      <GuestProfileInfo
        data={enemyData}
        subscribe={subscribe}
        subscribeIsLoading={subscribeIsLoading}
      />
      {
        <UIbutton
          icon={enemyData?.isSubscribed ? IconEnum.WhiteOk : IconEnum.UserAdd}
          onClick={subscribe}
          id="follow"
          className={styles["button-follow"]}
          fullWidth
          size="medium"
          color="primary"
          dataAutomation="FollowButton"
          isLoading={subscribeIsLoading}
          aria-label="Subscribe user profile button"
        >
          {enemyData?.isSubscribed ? "Unfollow" : "Follow"}
        </UIbutton>
      }
      {BooksCheker && <BookShelf enemyData={enemyData} Id={Id} />}
    </div>
  );
};

export default GuestProfile;
