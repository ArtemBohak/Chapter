import { FC, useState } from "react";
import styles from "./GuestProfile.module.scss";
import GuestProfileInfo from "./GuestProfileInfo/GuestProfileInfo";
import { BookShelf, IconEnum, UIbutton } from "@/src/components";
import { useParams } from "react-router";
import { EndpointsEnum, api, followApi } from "@/src/axios";
import { useGuestContext } from "../../context";
import { useDispatch } from "react-redux";
import { updateUser } from "@/src/redux";

const GuestProfile: FC = () => {
  const { Id } = useParams();
  const { enemyData, fetchEnemyUserData, BooksCheker } = useGuestContext()

  const [subscribeIsLoading, setSubscribeIsLoading] = useState(false)

  const dispatch = useDispatch();


  // const fetchEnemyUserData = async (Id: string | number | undefined) => {
  //   const response = await guestProfileApi(Id);
  //   setEnemyData(response.data);
  // };


  const subscribe = async () => {
    setSubscribeIsLoading(true)
    try {
      await followApi(Id);
      await fetchEnemyUserData(Id);
      const response = await api.get(EndpointsEnum.PROFILE);
      dispatch(updateUser(response.data));
    } catch (error) {
      console.log(error)
    }
    finally {
      setSubscribeIsLoading(false)
    }
  };

  return (
    <div className={styles["profile-conteiner"]}>
      <GuestProfileInfo data={enemyData} subscribe={subscribe} subscribeIsLoading={subscribeIsLoading} />
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
        >
          {enemyData?.isSubscribed ? "Unfollow" : "Follow"}
        </UIbutton>
      }
      {BooksCheker && <BookShelf enemyData={enemyData} Id={Id} />}
    </div>
  );
};

export default GuestProfile;
