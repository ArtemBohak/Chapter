import { FC } from "react";
import styles from "./ProfileInfo.module.scss";
import { Icon, IconEnum, UserAvatar } from "@/src/components";
import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { useAppSelector } from "@/src/redux";

const ProfileInfo: FC = () => {
  const { user } = useAppSelector((state) => state.userSlice);

  const {
    firstName,
    lastName,
    nickName,
    avatarUrl,
    myFollowersCount,
    myFollowingCount,
    userStatus,
  } = user;

  console.log(user);

  return (
    <>
      <div className={styles["profile-info"]}>
        <UserAvatar
          className={styles["profile-info__avatar"]}
          src={avatarUrl || defaultUserAvatar}
          alt={"avatar"}
        />
        <div className={styles["profile-info__wrapper"]}>
          <h4 className={styles["profile-info__fulname"]}>
            {firstName} {lastName}
          </h4>
          <p className={styles["profile-info__nickname"]}>{nickName}</p>
          <p className={styles["profile-info__address"]}>
            <Icon width={20} icon={IconEnum.Location} />
            Southern Air Temple
          </p>
          <div className={styles["profile-info__social-counters"]}>
            <p>
              <span>{myFollowersCount}</span> followers
            </p>
            <p>
              <span>{myFollowingCount}</span> follow
            </p>
          </div>
        </div>
      </div>
      <p className={styles["profile-info__status"]}>{userStatus}</p>
    </>
  );
};

export default ProfileInfo;
