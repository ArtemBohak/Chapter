import { FC, useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

import { api } from "@/src/axios";
import { SocketApi } from "@/src/services";
import { getTokenFromLC } from "@/src/utils";
import { useErrorBoundary } from "@/src/hooks";
import { useAppSelector } from "@/src/redux";
import { INotification, SocketEvents } from "@/src/types";
import { IProfileProviderProps } from "./ProfileProvider.type";
import { ProfileContext } from "./hooks";

const socket = new SocketApi();

const ProfileProvider: FC<IProfileProviderProps> = ({ children }) => {
  const setErrorBoundary = useErrorBoundary();
  const isAuth = useAppSelector((state) => state.userSlice.isAuth);
  const [isConnected, setIsConnected] = useState(false);

  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);

  const [notifications, setNotifications] = useState<Array<INotification>>([]);

  const [unreadMessage, setUnreadMessage] = useState(notifications.length);

  useEffect(() => {
    (async () => {
      try {
        const { data }: AxiosResponse<Array<INotification>> = await api.get("");
        setNotifications(data);
      } catch (e) {
        if (e instanceof AxiosError) {
          setErrorBoundary(e);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const onHandleSubscribe = socket.handleEvent<INotification, INotification>(
      setNotifications,
      setErrorBoundary
    );

    const onHandleNewPost = socket.handleEvent<INotification, INotification>(
      setNotifications,
      setErrorBoundary
    );

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
  }, [isConnected, setErrorBoundary]);

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
