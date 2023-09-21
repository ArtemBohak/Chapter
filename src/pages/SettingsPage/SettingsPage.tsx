import { FC } from "react";

import styles from "./SettingsPage.module.scss";

import Avatar from "./components/Avatar/Avatar";
import ImageUpload from "./components/ImageUpload/ImageUpload";

const SettingsPage: FC = () => {
  return (
    <section className={styles["settings"]}>
      <div className={styles["settings__container"]}>
        <div className={styles["settings__avatar"]}>
          <Avatar />
          <div>
            <ImageUpload />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
