import { Icon, IconEnum, UIbutton, UserAvatar } from "@/src/components";
import { FC } from "react";
import styles from "./ProfileBlock.module.scss";
import { useAppSelector } from "@/src/redux/hooks";
import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { links } from "@/src/types";

const Profile: FC = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  console.log(user);

  const {
    firstName,
    lastName,
    nickName,
    avatarUrl,
    myFollowersCount,
    myFollowingCount,
    userStatus,
  } = user;

  return (
    <div className={styles["profile-conteiner"]}>
      <div className={styles["profile-info"]}>
        <UserAvatar
          className={styles["profile-avatar"]}
          src={avatarUrl || defaultUserAvatar}
          alt={"avatar"}
        />
        <div className={styles["profile-info__text"]}>
          <h4 className={styles["profile-info__fulname"]}>
            {firstName} {lastName}
          </h4>
          <p className={styles["profile-info__nickname"]}>{nickName}</p>
          <p className={styles["profile-info__address"]}>
            <Icon width={20} icon={IconEnum.Location} />
            Southern Air Temple
          </p>
          <div className={styles["social-counters"]}>
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
      <div className={styles["buttons-block"]}>
        <UIbutton
          icon={IconEnum.AddPost}
          className={styles["button-add-post"]}
          fullWidth={true}
          isCustomIcon
          dataAutomation="addPost"
        >
          Add post
        </UIbutton>

        <UIbutton
          icon={IconEnum.EditProfile}
          className={styles["button-edit-profile"]}
          href={links.SETTINGS}
          fullWidth={true}
          variant="outlined"
          color="primary"
          dataAutomation="editProfile"
        >
          Edit profile
        </UIbutton>
      </div>
      <div className="w-full bg-primary h-[120px] md:h-[235px] text-center">
        Тут будет полка
      </div>
    </div>
  );
};

export default Profile;
