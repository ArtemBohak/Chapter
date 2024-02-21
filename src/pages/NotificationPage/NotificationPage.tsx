import { useProfileContext } from "@/src/context";
import { FC } from "react";

import styles from "./NotificationPage.module.scss";

const NotificationPage: FC = () => {
  const { setUnreadMessage } = useProfileContext();
  console.log(setUnreadMessage);

  return (
    <section className={styles["notification"]}>
      <div className={styles["notification__wrapper"]}>
        <div>
          <p>NOTIFICATION</p>
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;
