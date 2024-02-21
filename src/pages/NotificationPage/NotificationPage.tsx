import { FC } from "react";

import { useProfileContext } from "@/src/context";
import { useAppSelector } from "@/src/redux";
import styles from "./NotificationPage.module.scss";
import { Switch } from "./components";

const NotificationPage: FC = () => {
  const { setUnreadMessage } = useProfileContext();
  const {
    newPostNotification,
    commentsNotification,
    likesNotification,
    subscriptionNotification,
  } = useAppSelector((state) => state.userSlice.user);
  console.log(setUnreadMessage);

  return (
    <section className={styles["notification"]}>
      <div className={styles["notification__wrapper"]}>
        <div className={`${styles["list"]} ${styles["list__sets"]}`}>
          <Switch
            isChecked={newPostNotification}
            label="Notification of new posts"
            name="newPostNotification"
          />
          <Switch
            isChecked={subscriptionNotification}
            label="Subscription Notice"
            name="subscriptionNotification"
          />
          <Switch
            isChecked={likesNotification}
            label="Notification about likes"
            name="likesNotification"
          />
          <Switch
            isChecked={commentsNotification}
            label="Comment notification"
            name="commentsNotification"
          />
        </div>
        <div className={`${styles["list"]} ${styles["list__notice"]}`}>
          sada
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;
