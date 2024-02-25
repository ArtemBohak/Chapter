import { FC } from "react";

import { useProfileContext } from "@/src/context";
import { useAppSelector } from "@/src/redux";
import styles from "./NotificationPage.module.scss";

import { Toast } from "@/src/components";
import { Switch } from "./components";

const NotificationPage: FC = () => {
  const { notifications, setNotifications } = useProfileContext();
  const {
    newPostNotification,
    commentsNotification,
    likesNotification,
    subscriptionNotification,
  } = useAppSelector((state) => state.userSlice.user);

  return (
    <section className={styles["notifications"]}>
      <div className={styles["notifications__wrapper"]}>
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
                <Toast
                  {...el}
                  setNotifications={setNotifications}
                  classNames={styles["toast"]}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;
