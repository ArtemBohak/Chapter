import { FC } from "react";

import { useProfileContext } from "@/src/context";
import { useAppSelector } from "@/src/redux";
import styles from "./NotificationPage.module.scss";
import { Notification, Switch } from "./components";

const tempData = [
  {
    id: 0,
    avatarUrl: null,
    firstName: "Mattew",
    lastName: "Downroy",
    messageValue: "New post",
  },
  {
    id: 1,
    avatarUrl: null,
    firstName: "Mattew",
    lastName: "Downroy",
    messageValue: "Subscribed to you",
  },
  {
    id: 2,
    avatarUrl: null,
    firstName: "Mattew",
    lastName: "Downroy",
    messageValue: "Your post was liked",
  },
  {
    id: 3,
    avatarUrl: null,
    firstName: "Mattew",
    lastName: "Downroy",
    messageValue: "There is a new comment on your post",
  },
];

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
            {tempData.map((el) => (
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
