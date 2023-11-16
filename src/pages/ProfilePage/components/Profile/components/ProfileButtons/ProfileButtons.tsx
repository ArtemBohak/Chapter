import { FC } from "react";
import styles from "./ProfileButtons.module.scss";
import { IconEnum, UIbutton } from "@/src/components";
import { links } from "@/src/types";

const ProfileButtons: FC = () => {
  return (
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
  );
};

export default ProfileButtons;
