import { FC, createRef } from "react";
import { AxiosError } from "axios";
import { TransitionGroup } from "react-transition-group";

import { useProfileContext } from "@/src/context";
import { INotification } from "@/src/types";
import { useErrorBoundary } from "@/src/hooks";
import styles from "./NotificationPage.module.scss";

import { Animation, Toast } from "@/src/components";
import { api } from "@/src/axios";

const NotificationPage: FC = () => {
  const { notifications, setNotifications } = useProfileContext();
  const setErrorBoundary = useErrorBoundary();

  const editedNotifications: Array<INotification> = notifications.map((el) => ({
    ...el,
    nodeRef: createRef(),
  }));

  const onHandleClick = async () => {
    try {
      setNotifications([]);
      await api.delete("");
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    }
  };

  const transitionClassNames = {
    enter: styles["notifications__list-enter"],
    enterActive: styles["notifications__list-enter-active"],
    exit: styles["notifications__list-exit"],
    exitActive: styles["notifications__list-exit-active"],
  };

  return (
    <section className={styles["notifications"]}>
      <div className={styles["wrapper"]}>
        {notifications.length ? (
          <button
            onClick={onHandleClick}
            className={styles["notifications__button"]}
          >
            Delete all notifications
          </button>
        ) : null}
        <TransitionGroup
          component={"ul"}
          className={styles["notifications__list"]}
        >
          {editedNotifications.map((el) => {
            return (
              <Animation
                key={el.id}
                nodeRef={el.nodeRef}
                classNames={transitionClassNames}
                timeout={300}
              >
                <li>
                  <Toast {...el} setNotifications={setNotifications} />
                </li>
              </Animation>
            );
          })}
        </TransitionGroup>
      </div>
    </section>
  );
};

export default NotificationPage;
