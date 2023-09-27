import { FC, useState } from "react";

import styles from "./SettingsPage.module.scss";

import {
  Avatar,
  ImageUpload,
  Layout,
  UserStory,
  UserName,
  Location,
  UpdatePassword,
  AccountDeletion,
} from "./components";

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
            <Layout
              className={`${styles["form-wrapper--top-spacing"]} ${styles["user-bio"]}`}
            >
              <UserStory />
            </Layout>
          </div>
        </div>
      </div>
      <div
        className={`${styles["settings__container"]} ${styles["settings__container-bottom"]}`}
      >
        <Layout
          title="Personal Info"
          className={styles["form-wrapper--bottom-spacing"]}
          fullWidth
        >
          <UserName />
        </Layout>
        <Layout
          title="Location"
          className={styles["form-wrapper--bottom-spacing"]}
          fullWidth
        >
          <Location />
        </Layout>
        <Layout
          title="Update password"
          className={styles["form-wrapper--bottom-spacing"]}
          fullWidth
        >
          <UpdatePassword />
        </Layout>
        <Layout fullWidth>
          <AccountDeletion />
        </Layout>
      </div>
    </section>
  );
};

export default SettingsPage;
