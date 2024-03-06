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
import { apiUiMessage } from "@/src/types";

const SettingsPage: FC = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const setBoundaryError = useErrorBoundary();

  useEffect(() => {
    setAvatarUrl(user.avatarUrl);
  }, [user.avatarUrl]);

  useEffect(() => {
    if (file) {
      setError("");
      new ProfileUpdateApi(setIsLoading, setBoundaryError)
        .imageSave(user.id, file)
        .then((res) => {
          if (res?.code) setError(apiUiMessage.ERROR_MESSAGE);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, user.id]);

  return (
    <section className={styles["settings"]}>
      <div className={`${styles["container"]} ${styles["container__top"]}`}>
        <User avatarUrl={avatarUrl} email={user.email} />
        <div className={styles["settings__form"]}>
          <ImageField
            btnVariant="button"
            setFile={setFile}
            isLoading={isLoading}
            error={error}
          />
          <Layout className={styles["form__top"]} customSpacing>
            <UserStatus userStatus={user.userStatus} />
          </Layout>
        </div>
      </div>
      <div className={`${styles["container"]} ${styles["container__bottom"]}`}>
        <Layout
          title="Personal Info"
          className={styles["form__bottom"]}
          fullWidth
        >
          <UserName firstName={user.firstName} lastName={user.lastName} />
        </Layout>
        <Layout title="Location" className={styles["form__bottom"]} fullWidth>
          <UserLocation />
        </Layout>
        <Layout
          title="Update password"
          className={styles["form__bottom"]}
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
