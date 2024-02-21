import { useProfileContext } from "@/src/context";
import { FC } from "react";

import styles from "./NotificationPage.module.scss";
import { Switch } from "./components";

const NotificationPage: FC = () => {
  const { setUnreadMessage } = useProfileContext();
  console.log(setUnreadMessage);

  return (
    <section className={styles["notification"]}>
      <div className={styles["notification__wrapper"]}>
        <div>
          <Switch />
          <p>NOTIFICATION</p>
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;
