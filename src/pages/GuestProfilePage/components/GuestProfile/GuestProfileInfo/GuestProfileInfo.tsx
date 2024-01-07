import { FC } from "react";
import styles from "./GuestProfileInfo.module.scss";
import {
  FollowButton,
  Icon,
  IconEnum,
  UIbutton,
  UserAvatar,
} from "@/src/components";
import { guestProfileProps } from "./GuestProfile.type";
import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const GuestProfileInfo: FC<guestProfileProps> = ({ ...props }) => {
  const { data } = props;
  console.log(data);
  return (
    <>
      <div className={styles["profile-info"]}>
        <div className="flex w-full gap-5 md:items-center md:w-4/6 laptop_md:w-full">
          <UserAvatar
            className={styles["profile-info__avatar"]}
            src={data?.avatarUrl || defaultUserAvatar}
            alt={"avatar"}
          />
          <div className={styles["profile-info__wrapper"]}>
            <h4 className={styles["profile-info__fulname"]}>
              {data?.firstName} {data?.lastName}
            </h4>
            <p className={styles["profile-info__nickname"]}>{data?.nickName}</p>
            <p className={styles["profile-info__address"]}>
              <Icon width={20} icon={IconEnum.Location} />
              {data?.location}
            </p>
            <div className={styles["profile-info__social-counters"]}>
              <p>
                <span>{data?.myFollowersCount}</span> followers
              </p>
              <p>
                <span>{data?.myFollowingCount}</span> follow
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

      <p className={styles["profile-info__status"]}>{data?.userStatus}</p>
    </>
  );
};

export default GuestProfileInfo;
