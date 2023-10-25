import { FC, useState } from "react";

import { useAppSelector } from "@/src/redux";
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
  const { user } = useAppSelector((state) => state.userSlice);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatarUrl);

  return (
    <section className={styles["settings"]}>
      <div
        className={`${styles["settings__container"]} ${styles["settings__container-top"]}`}
      >
        <UserAvatar avatarUrl={avatarUrl} userEmail={user.userEmail} />
        <div className={styles["settings__input-wrapper"]}>
          <ImageUpload setAvatarUrl={setAvatarUrl} id={user.id} />
          <Layout className={styles["form-wrapper__top-spacing"]} customSpacing>
            <UserStory userStatus={user.userStatus} />
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
          <UserLocation
            country={user.country}
            region={user.region}
            city={user.city}
          />
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
