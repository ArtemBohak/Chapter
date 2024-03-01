import { FC, useEffect, useState } from "react";

import { SocketApi } from "@/src/services";
import { getTokenFromLC } from "@/src/utils";
import { useAppSelector } from "@/src/redux";
import { INotification, SocketEvents } from "@/src/types";
import { ProfileContext } from "./hooks";
import { IProfileProviderProps } from "./ProfileProvider.type";

const socket = new SocketApi();

const ProfileProvider: FC<IProfileProviderProps> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.userSlice.isAuth);
  const [isConnected, setIsConnected] = useState(false);

  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);

  const [notifications, setNotifications] = useState<Array<INotification>>([]);

  const [unreadMessage, setUnreadMessage] = useState(notifications.length);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      socket.connect(isAuth);
    };

    if (getTokenFromLC()) {
      socket.init(getTokenFromLC() + "");
      socket.connect(isAuth);
    }

    socket.addListener("connect", onConnect);
    socket.addListener("disconnect", onDisconnect);

    return () => {
      socket.removeListener("connect", onConnect);
      socket.removeListener("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [isAuth]);

  useEffect(() => {
    const onHandleSubscribe =
      socket.handleEvent<INotification>(setNotifications);

    const onHandleNewPost = socket.handleEvent<INotification>(setNotifications);

    if (isConnected) {
      socket.addListener<INotification>(
        SocketEvents.subscribe,
        onHandleSubscribe
      );

      socket.addListener<INotification>(SocketEvents.post, onHandleNewPost);
    }

    return () => {
      socket.removeListener<INotification>(
        SocketEvents.subscribe,
        onHandleSubscribe
      );

      socket.removeListener<INotification>(SocketEvents.post, onHandleNewPost);
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
