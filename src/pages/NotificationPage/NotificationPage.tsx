import { FC } from "react";
import { TransitionGroup } from "react-transition-group";

import { useProfileContext } from "@/src/context";

import styles from "./NotificationPage.module.scss";

import { Animation, Toast } from "@/src/components";

const NotificationPage: FC = () => {
  const { notifications, setNotifications } = useProfileContext();

  const transitionClassNames = {
    enter: styles["notifications__list-enter"],
    enterActive: styles["notifications__list-enter-active"],
    exit: styles["notifications__list-exit"],
    exitActive: styles["notifications__list-exit-active"],
  };

  return (
    <section className={styles["notifications"]}>
      <div className={styles["notifications__wrapper"]}>
        <TransitionGroup
          component={"ul"}
          className={styles["notifications__list"]}
        >
          {notifications.map((el) => (
            <Animation
              key={el.keyId}
              nodeRef={el.nodeRef}
              classNames={transitionClassNames}
              timeout={300}
            >
              <li>
                <Toast
                  {...el}
                  setNotifications={setNotifications}
                  classNames={styles["notification"]}
                />
              </li>
            </Animation>
          ))}
        </TransitionGroup>
      </div>
    </section>
  );
};

export default NotificationPage;
