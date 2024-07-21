import { FC, useRef, useState } from "react";
import { AxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { TransitionGroup } from "react-transition-group";

import { useProfileContext } from "@/src/context";

import { useErrorBoundary } from "@/src/hooks";
import styles from "./NotificationPage.module.scss";

import { Animation, Loader, Toast } from "@/src/components";

const NotificationPage: FC = () => {
  const {
    newNotifications,
    viewedNotifications,
    notificationsLength,
    isLoading: isLoadingOnMount,
    setNotifications,
  } = useProfileContext();
  const setErrorBoundary = useErrorBoundary();
  const btnRef = useRef(null);
  const textRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

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

  const isNots = !!notificationsLength;

  const renderNewNots = (
    <TransitionGroup component={"ul"} className={styles["notifications__list"]}>
      {newNotifications.map((el) => {
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
  );

  const renderViewedNots = (
    <TransitionGroup component={"ul"} className={styles["notifications__list"]}>
      {viewedNotifications.map((el) => {
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
  );
  return (
    <section className={styles["notifications"]}>
      <div className={styles["wrapper"]}>
        <Animation
          nodeRef={btnRef}
          classNames={transitionClassNames}
          timeout={300}
          in={isNots}
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
            in={!isNots}
            unmountOnExit
          >
            <p ref={textRef} className={styles["notifications__text"]}>
              There are no notifications at the moment
            </p>
          </Animation>
        ) : null}
        <div className={styles["new-nots"]}>
          {newNotifications.length ? (
            <h3 className={styles["title"]}>New</h3>
          ) : null}
          {renderNewNots}
        </div>
        <div className={styles["new-nots"]}>
          {viewedNotifications.length ? (
            <h3 className={styles["title"]}>Viewed</h3>
          ) : null}
          {renderViewedNots}
        </div>
        <Loader isShown={isLoading || isLoadingOnMount} />
      </div>
    </section>
  );
};

export default NotificationPage;
