import { FC, createRef, useRef, useState } from "react";
import { AxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { TransitionGroup } from "react-transition-group";

import { useProfileContext } from "@/src/context";
import { INotification } from "@/src/types";
import { useErrorBoundary } from "@/src/hooks";
import styles from "./NotificationPage.module.scss";

import { Animation, Loader, Toast } from "@/src/components";

const NotificationPage: FC = () => {
  const {
    notifications,
    isLoading: isLoadingOnMount,
    setNotifications,
  } = useProfileContext();
  const setErrorBoundary = useErrorBoundary();
  const btnRef = useRef(null);
  const textRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const editedNotifications: Array<INotification> = notifications
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .map((el) => ({
      ...el,
      nodeRef: createRef(),
    }));

  const onHandleClick = async () => {
    try {
      setIsLoading(true);
      await api.delete(EndpointsEnum.DELETE_ALL_NOTA);
      setNotifications([]);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    } finally {
      setIsLoading(false);
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
        <Animation
          nodeRef={btnRef}
          classNames={transitionClassNames}
          timeout={300}
          in={!!notifications.length}
          unmountOnExit
        >
          <button
            ref={btnRef}
            onClick={onHandleClick}
            className={styles["notifications__button"]}
            aria-label="Delete all notifications button"
          >
            Delete all notifications
          </button>
        </Animation>
        {!isLoadingOnMount ? (
          <Animation
            nodeRef={textRef}
            classNames={transitionClassNames}
            timeout={300}
            in={!notifications.length}
            unmountOnExit
          >
            <p ref={textRef} className={styles["notifications__text"]}>
              There are no notifications at the moment
            </p>
          </Animation>
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
                  <Toast
                    {...el}
                    setNotifications={setNotifications}
                    setIsLoading={setIsLoading}
                  />
                </li>
              </Animation>
            );
          })}
        </TransitionGroup>
        <Loader isShown={isLoading || isLoadingOnMount} />
      </div>
    </section>
  );
};

export default NotificationPage;
