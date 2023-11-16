import { FC } from "react";
import styles from "./Profile.module.scss";
import ProfileButtons from "./components/ProfileButtons/ProfileButtons";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import { BookShelf } from "@/src/components";

const Profile: FC = () => {
  return (
    <div className={styles["profile-conteiner"]}>
      <ProfileInfo />
      <ProfileButtons />
      <BookShelf />
    </div>
  );
};

export default Profile;
