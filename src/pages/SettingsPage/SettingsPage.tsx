import { FC, useEffect, useState } from "react";

import { ProfileUpdateApi } from "./utils/ProfileUpdateApi";
import { useAppSelector } from "@/src/redux";
import { useErrorBoundary } from "@/src/hooks";
import styles from "./SettingsPage.module.scss";

import {
  User,
  Layout,
  UserStatus,
  UserName,
  UserLocation,
  UserPassword,
  UserAccountDeletion,
} from "./components";
import { ImageField } from "@/src/components";

const SettingsPage: FC = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setError = useErrorBoundary(400);

  useEffect(() => {
    setAvatarUrl(user.avatarUrl);
  }, [user.avatarUrl]);

  useEffect(() => {
    file &&
      new ProfileUpdateApi(setIsLoading, setError).imageSave(user.id, file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, user.id]);

  return (
    <section className={styles["settings"]}>
      <div
        className={`${styles["settings__container"]} ${styles["settings__container-top"]}`}
      >
        <User avatarUrl={avatarUrl} email={user.email} />
        <div className={styles["settings__input-wrapper"]}>
          <ImageField
            btnVariant="button"
            setFile={setFile}
            isLoading={isLoading}
          />
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
