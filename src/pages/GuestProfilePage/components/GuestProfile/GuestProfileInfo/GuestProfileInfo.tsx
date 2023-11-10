import { FC, useEffect, useState } from "react";
import styles from "./GuestProfileInfo.module.scss";
import { Icon, IconEnum, UIbutton, UserAvatar } from "@/src/components";
import GuestProfileApi from "../../GuestProfileApi/GuestProfileApi";
import { useParams } from "react-router-dom";

const GuestProfileInfo: FC = () => {
  //This is not finished
  // const [guestProfileData, setGuestProfileData] = useState(null);
  // const { Id }: any = useParams();
  // const getUserInfo = async () => {
  //   try {
  //     const response = await GuestProfileApi(Id);
  //     const { data } = response;
  //     setGuestProfileData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  // console.log(guestProfileData);
  return (
    <>
      <div className={styles["profile-info"]}>
        <div className="flex w-full gap-5 md:items-center md:w-4/6 laptop_md:w-full">
          <UserAvatar
            className={styles["profile-info__avatar"]}
            src={"https://i.ibb.co/2ZXKGCR/istockphoto-146962195-612x612.jpg"}
            alt={"avatar"}
          />
          <div className={styles["profile-info__wrapper"]}>
            <h4 className={styles["profile-info__fulname"]}>Joan Rodrigo</h4>
            <p className={styles["profile-info__nickname"]}>@sweetcat556</p>
            <p className={styles["profile-info__address"]}>
              <Icon width={20} icon={IconEnum.Location} />
              Southern Air Temple
            </p>
            <div className={styles["profile-info__social-counters"]}>
              <p>
                <span>3230</span> followers
              </p>
              <p>
                <span>123</span> follow
              </p>
            </div>
          </div>
        </div>
        <UIbutton
          icon={IconEnum.UserAdd}
          id="follow"
          className={styles["button-follow"]}
          fullWidth={false}
          size="medium"
          color="primary"
          dataAutomation="FollowButton"
        >
          Follow
        </UIbutton>
      </div>

      <p className={styles["profile-info__status"]}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
        itaque libero nihil eveniet? Impedit, aliquam modi in tempora soluta id
        voluptas quis facilis nobis unde exercitationem vitae magni sapiente
        quos!
      </p>
    </>
  );
};

export default GuestProfileInfo;
