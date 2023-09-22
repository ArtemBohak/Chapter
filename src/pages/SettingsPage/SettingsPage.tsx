import { FC, useState } from "react";

import styles from "./SettingsPage.module.scss";

import Avatar from "./components/Avatar/Avatar";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import Layout from "./components/Layout/Layout";
import Bio from "./components/UserBio/UserBio";
import UserInfo from "./components/UserInfo/UserInfo";

const SettingsPage: FC = () => {
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <section className={styles["settings"]}>
      <div
        className={`${styles["settings__container"]} ${styles["settings__container-top"]}`}
      >
        <div className={styles["settings__avatar"]}>
          <Avatar avatarUrl={avatarUrl} />
          <div className={styles["settings__input-container"]}>
            <ImageUpload setAvatarUrl={setAvatarUrl} />
            <Layout editIcon>
              <Bio />
            </Layout>
          </div>
        </div>
      </div>
      <div
        className={`${styles["settings__container"]} ${styles["settings__container-bottom"]}`}
      >
        <Layout title="Personal Info" editIcon fullWidth>
          <UserInfo />
        </Layout>
      </div>
    </section>
  );
};

export default SettingsPage;
