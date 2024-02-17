import { FC } from "react";
import styles from "./GuestProfileInfo.module.scss";
import {
  Icon,
  IconEnum,
  UIbutton,
  UserAvatar,
} from "@/src/components";
import { guestProfileProps } from "./GuestProfile.type";
import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { useGuestContext } from "../../../context";

const GuestProfileInfo: FC<guestProfileProps> = ({ subscribe, subscribeIsLoading }) => {
  const { enemyData } = useGuestContext()
  return (
    <>
      <div className={styles["profile-info"]}>
        <div className="flex w-full gap-5 md:items-center md:w-4/6 laptop_md:w-full">
          <UserAvatar
            className={styles["profile-info__avatar"]}
            src={enemyData?.avatarUrl || defaultUserAvatar}
            alt={"avatar"}
          />
          <div className={styles["profile-info__wrapper"]}>
            <h4 className={styles["profile-info__fulname"]}>
              {enemyData?.firstName} {enemyData?.lastName}
            </h4>
            <p className={styles["profile-info__nickname"]}>{enemyData?.nickName}</p>
            <p className={styles["profile-info__address"]}>
              <Icon width={20} icon={IconEnum.Location} />
              {enemyData?.location}
            </p>
            <div className={styles["profile-info__social-counters"]}>
              <p>
                <span>{enemyData?.myFollowersCount}</span> followers
              </p>
              <p>
                <span>{enemyData?.myFollowingCount}</span> follow
              </p>
            </div>
          </div>
        </div>
        <UIbutton
          icon={enemyData?.isSubscribed ? IconEnum.WhiteOk : IconEnum.UserAdd}
          onClick={subscribe}
          id="follow"
          className={styles["button-follow"]}
          fullWidth={false}
          size="medium"
          color="primary"
          dataAutomation="FollowButton"
          isLoading={subscribeIsLoading}
        >
          {enemyData?.isSubscribed ? "Unfollow" : "Follow"}
        </UIbutton>
      </div>

      <p className={styles["profile-info__status"]}>{enemyData?.userStatus}</p>
    </>
  );
};

export default GuestProfileInfo;
