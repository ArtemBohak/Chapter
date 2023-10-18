import { FC, useState } from "react";

import styles from "./SettingsPage.module.scss";

import {
  UserAvatar,
  ImageUpload,
  Layout,
  UserStory,
  UserName,
  UserLocation,
  UpdateUserPassword,
  UserAccountDeletion,
} from "./components";

const SettingsPage: FC = () => {
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <section className={styles["settings"]}>
      <div
        className={`${styles["settings__container"]} ${styles["settings__container-top"]}`}
      >
        <UserAvatar avatarUrl={avatarUrl} />
        <div className={styles["settings__input-wrapper"]}>
          <ImageUpload setAvatarUrl={setAvatarUrl} />
          <Layout className={styles["form-wrapper__top-spacing"]} customSpacing>
            <UserStory />
          </Layout>
        </div>
      </div>
      <div
        className={`${styles["settings__container"]} ${styles["settings__container-bottom"]}`}
      >
        <Layout
          title="Personal Info"
          className={styles["form-wrapper__bottom-spacing"]}
          fullWidth
        >
          <UserName />
        </Layout>
        <Layout
          title="Location"
          className={styles["form-wrapper__bottom-spacing"]}
          fullWidth
        >
          <UserLocation />
        </Layout>
        <Layout
          title="Update password"
          className={styles["form-wrapper__bottom-spacing"]}
          fullWidth
        >
          <UpdateUserPassword />
        </Layout>
        <Layout fullWidth>
          <UserAccountDeletion />
        </Layout>
      </div>
    </section>
  );
};

export default SettingsPage;
