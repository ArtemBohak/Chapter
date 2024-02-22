import { FC } from "react";

import { useProfileContext } from "@/src/context";
import { useAppSelector } from "@/src/redux";
import styles from "./NotificationPage.module.scss";
import { Notification, Switch } from "./components";

const NotificationPage: FC = () => {
  const { notifications } = useProfileContext();
  const {
    newPostNotification,
    commentsNotification,
    likesNotification,
    subscriptionNotification,
  } = useAppSelector((state) => state.userSlice.user);

  return (
    <section className={styles["notification"]}>
      <div className={styles["notification__wrapper"]}>
        <div className={styles["container"]}>
          <div className={styles["sets-list"]}>
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
          <ul className={styles["notify-list"]}>
            {notifications.map((el) => (
              <li key={el.id}>
                <Notification {...el} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;
