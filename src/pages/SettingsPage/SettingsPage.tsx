import { FC, useEffect, useState } from "react";

import { useAppSelector } from "@/src/redux";
import styles from "./SettingsPage.module.scss";

import {
  User,
  ImageUpload,
  Layout,
  UserStatus,
  UserName,
  UserLocation,
  UserPassword,
  UserAccountDeletion,
} from "./components";

const SettingsPage: FC = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  useEffect(() => {
    setAvatarUrl(user.avatarUrl);
  }, [user.avatarUrl]);

  return (
    <section className={styles["settings"]}>
      <div
        className={`${styles["settings__container"]} ${styles["settings__container-top"]}`}
      >
        <User avatarUrl={avatarUrl} email={user.email} />
        <div className={styles["settings__input-wrapper"]}>
          <ImageUpload id={user.id} />
          <Layout className={styles["form-wrapper__top-spacing"]} customSpacing>
            <UserStatus userStatus={user.userStatus} />
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
          <UserName firstName={user.firstName} lastName={user.lastName} />
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
          <UserPassword />
        </Layout>
        <Layout fullWidth>
          <UserAccountDeletion />
        </Layout>
      </div>
    </section>
  );
};

export default SettingsPage;
