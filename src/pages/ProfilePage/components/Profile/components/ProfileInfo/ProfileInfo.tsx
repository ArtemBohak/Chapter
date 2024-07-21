import { FC, useState } from "react";
import styles from "./ProfileInfo.module.scss";
import { Icon, IconEnum, UserAvatar } from "@/src/components";
import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { useAppSelector } from "@/src/redux";
import FollowModal from "../FollowModal/FollowModal";
import FollowersModal from "../FollowersModal/FollowersModal";

const ProfileInfo: FC = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);

  const getFollowList = async () => {
    setIsFollowModalOpen(!isFollowModalOpen);
  };
  const getFollowersList = async () => {
    setIsFollowersModalOpen(!isFollowModalOpen);
  };

  const {
    firstName,
    lastName,
    nickName,
    avatarUrl,
    myFollowersCount,
    myFollowingCount,
    userStatus,
    location,
  } = user;

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
            {location}
          </p>
          <div className={styles["profile-info__social-counters"]}>
            <button
              className={styles["default-button"]}
              onClick={getFollowersList}
              aria-label="Get followers list button"
            >
              <span>{myFollowersCount || 0}</span> followers
            </button>
            <button
              className={styles["default-button"]}
              onClick={getFollowList}
              aria-label="Get follow list button"
            >
              <span>{myFollowingCount || 0}</span> following
            </button>
          </div>
        </div>
      </div>
      <p className={styles["profile-info__status"]}>{userStatus}</p>
      <FollowersModal
        isFollowersModalOpen={isFollowersModalOpen}
        setIsFollowersModalOpen={setIsFollowersModalOpen}
      />
      <FollowModal
        isFollowModalOpen={isFollowModalOpen}
        setIsFollowModalOpen={setIsFollowModalOpen}
      />
    </>
  );
};

export default ProfileInfo;
