import { FC } from "react";
import styles from "./ProfileButtons.module.scss";
import { IconEnum, UIbutton } from "@/src/components";
import { links } from "@/src/types";
import { ProfileButtonsProps } from "./ProfileButtons.type";

const ProfileButtons: FC<ProfileButtonsProps> = ({ setIsOpen }) => {
  return (
    <div className={styles["buttons-block"]}>
      <UIbutton
        icon={IconEnum.AddPost}
        onClick={() => setIsOpen(true)}
        className={styles["button-add-post"]}
        fullWidth={true}
        isCustomIcon
        dataAutomation="addPost"
        aria-label="Add post open modal button"
      >
        Add post
      </UIbutton>
      <UIbutton
        icon={IconEnum.EditProfile}
        className={styles["button-edit-profile"]}
        href={links.SETTINGS}
        fullWidth={true}
        variant="outlined"
        aria-label="Edit post open modal button"
        color="primary"
        dataAutomation="editProfile"
      >
        Edit profile
      </UIbutton>
    </div>
  );
};

export default ProfileButtons;
