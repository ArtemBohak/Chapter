import { FC } from "react";
import styles from "./Profile.module.scss";
import ProfileButtons from "./components/ProfileButtons/ProfileButtons";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import { BookShelf } from "@/src/components";
import { ProfileProps } from "./Profile.type";

const Profile: FC<ProfileProps> = (props) => {
  return (
    <div className={styles["profile-conteiner"]}>
      <ProfileInfo />
      <ProfileButtons {...props} />
      <BookShelf />
    </div>
  );
};

export default Profile;
