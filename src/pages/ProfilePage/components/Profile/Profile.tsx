import { Icon, IconEnum, UIbutton, UserAvatar } from "@/src/components";
import { FC } from "react";
import styles from "./ProfileBlock.module.scss";
import { useAppSelector } from "@/src/redux/hooks";
import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Profile: FC = () => {
  const userSlice = useAppSelector((state) => state.userSlice.user);

  console.log(userSlice);

  const {
    firstName,
    lastName,
    nickName,
    avatarUrl,
    myFollowersCount,
    myFollowingCount,
    userStatus,
  } = userSlice;

  return (
    <div className={styles["profile-wrapper"]}>
      <div className={styles["info-block"]}>
        <UserAvatar
          className={styles["profile-avatar"]}
          src={avatarUrl || defaultUserAvatar}
          alt={"avatar"}
        />
        <div className={styles["info-block__text"]}>
          <h3 className={styles["info-block__fulname"]}>
            {firstName} {lastName}
          </h3>
          <h3 className={styles["nickname"]}>{nickName}</h3>
          <h4 className="text-xs text-grey-1000 flex items-end font-normal mb-5">
            <Icon width={20} icon={IconEnum.Location} />
            Southern Air Temple
          </h4>
          <div className="flex text-sm gap-4 text-center">
            <p>
              <span className="text-black font-bold">
                {myFollowersCount?.toString()}
              </span>{" "}
              followers
            </p>
            <p>
              <span className="text-black font-bold">
                {myFollowingCount?.toString()}
              </span>{" "}
              follow
            </p>
          </div>
        </div>
        <p className={styles["info-block__status"]}>{userStatus}</p>
      </div>
      <div className={styles["buttons-block"]}>
        <UIbutton
          icon={IconEnum.AddPost}
          className={styles["button-add-post"]}
          isCustomIcon
          fullWidth
          dataAutomation="addPost"
        >
          Add post
        </UIbutton>

        <UIbutton
          icon={IconEnum.EditProfile}
          className={styles["button-edit-profile"]}
          fullWidth={true}
          variant="outlined"
          color="primary"
          dataAutomation="editProfile"
        >
          Edit profile
        </UIbutton>
      </div>
      <div className="w-full bg-emerald-600 h-[100px]"></div>
    </div>
  );
};

export default Profile;
