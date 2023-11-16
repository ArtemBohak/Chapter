import { FC } from "react";
import styles from "./GuestProfile.module.scss";
import GuestProfileInfo from "./GuestProfileInfo/GuestProfileInfo";
import { IconEnum, UIbutton } from "@/src/components";

const GuestProfile: FC = () => {
  return (
    <div className={styles["profile-conteiner"]}>
      <GuestProfileInfo />
      <UIbutton
        icon={IconEnum.UserAdd}
        id="follow"
        className={styles["button-follow"]}
        fullWidth
        size="medium"
        color="primary"
        dataAutomation="FollowButton"
      >
        Follow
      </UIbutton>
      <div className="w-full bg-primary h-[120px] md:h-[235px] text-center">
        Тут будет полка
      </div>
    </div>
  );
};

export default GuestProfile;
