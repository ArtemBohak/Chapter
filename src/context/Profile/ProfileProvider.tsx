import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { SocketApi } from "@/src/services";
import { getTokenFromLC } from "@/src/utils";
import { useAppSelector } from "@/src/redux";
import { NotificationType } from "@/src/types";
import { ProfileContext } from "./hooks";
import { IProfileProviderProps } from "./ProfileProvider.type";

import styles from "./ProfileProvider.module.scss";

import { Toast } from "@/src/components";

const tempData = {
  id: 0,
  avatarUrl: null,
  firstName: "Mattew",
  lastName: "Downroy",
  messageValue: "New post",
};
const socket = new SocketApi(getTokenFromLC());

const ProfileProvider: FC<IProfileProviderProps> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.userSlice.isAuth);
  const [isConnected, setIsConnected] = useState(false);

  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);

  const [notifications, setNotifications] = useState<Array<NotificationType>>([
    tempData,
  ]);

  const [unreadMessage, setUnreadMessage] = useState(notifications.length);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.connect(isAuth);

    socket.addListener("connect", onConnect);
    socket.addListener("disconnect", onDisconnect);

    return () => {
      socket.removeListener("connect", onConnect);
      socket.removeListener("disconnect", onDisconnect);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  useEffect(() => {
    const onHandleSubscribe = (e: string) => {
      const obj: NotificationType = {
        avatarUrl: tempData.avatarUrl,
        id: tempData.id,
        firstName: tempData.firstName,
        lastName: tempData.lastName,
        messageValue: e,
      };
      setNotifications((state) => [...state, obj]);

      toast.custom((t) => (
        <Toast
          toastId={t.id}
          setNotifications={setNotifications}
          classNames={styles["toast"]}
          messageClassNames={styles["toast__message"]}
          {...obj}
        />
      ));
    };

    if (isConnected) {
      socket.addListener<string>("subscribeNotification", onHandleSubscribe);
    }

    return () => {
      socket.removeListener<string>("subscribeNotification", onHandleSubscribe);
    };
  }, [isConnected]);

  useEffect(() => {
    setUnreadMessage(notifications.length);
  }, [notifications.length]);

  return (
    <ProfileContext.Provider
      value={{
        headerAddPostBtnIsDisabled,
        unreadMessage,
        notifications,
        setHeaderAddPostBtnIsDisabled,
        setUnreadMessage,
        setNotifications,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
