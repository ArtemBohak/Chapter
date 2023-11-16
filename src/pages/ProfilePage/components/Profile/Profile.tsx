import { FC } from "react";
import styles from "./Profile.module.scss";
import ProfileButtons from "./components/ProfileButtons/ProfileButtons";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";

const Profile: FC = () => {
  return (
    <div className={styles["profile-conteiner"]}>
      <ProfileInfo />
      <ProfileButtons />
      <div className="w-full bg-primary h-[120px] md:h-[235px] text-center">
        Тут будет полка
      </div>
    </div>
  );
};

export default Profile;
