import { FC } from "react";

import { useProfileContext } from "@/src/context";

import styles from "./NotificationPage.module.scss";

import { Toast } from "@/src/components";

const NotificationPage: FC = () => {
  const { notifications, setNotifications } = useProfileContext();

  return (
    <section className={styles["notifications"]}>
      <div className={styles["notifications__wrapper"]}>
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
    </section>
  );
};

export default NotificationPage;
