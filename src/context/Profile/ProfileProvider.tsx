import { FC, useEffect, useLayoutEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { SocketApi } from "@/src/services";
import { getTokenFromLC } from "@/src/utils";
import { useErrorBoundary } from "@/src/hooks";
import { useAppSelector } from "@/src/redux";
import { INots, SocketEventsEnum } from "@/src/types";
import { IProfileProviderProps } from "./ProfileProvider.type";
import { ProfileContext } from "./hooks";

const socket = new SocketApi();

const ProfileProvider: FC<IProfileProviderProps> = ({ children }) => {
  const setErrorBoundary = useErrorBoundary();
  const isAuth = useAppSelector((state) => state.userSlice.isAuth);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [headerAddPostBtnIsDisabled, setHeaderAddPostBtnIsDisabled] =
    useState(false);

  const [notifications, setNotifications] = useState<Array<INots>>([]);

  const [unreadMessage, setUnreadMessage] = useState(notifications.length);

  useLayoutEffect(() => {
    setIsLoading(true);
    api
      .get(EndpointsEnum.NOTA)
      .then(({ data }: AxiosResponse<Array<INots>>) => setNotifications(data))
      .catch((e) => {
        if (e instanceof AxiosError) {
          setErrorBoundary(e);
        }
      })
      .finally(() => setIsLoading(false));
  }, [setErrorBoundary]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onError = (error: Error) => {
      console.log(error);
      socket.connect(isAuth);
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
    socket.addListener("connect_error", onError);
    socket.addListener("disconnect", onDisconnect);

    return () => {
      socket.removeListener("connect", onConnect);
      socket.addListener("connect_error", onError);
      socket.removeListener("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [isAuth]);

  useEffect(() => {
    const onHandleSubscribe = socket.handleData<INots>(
      setNotifications,
      setErrorBoundary
    );

    const onHandleNewPost = socket.handleData<INots>(
      setNotifications,
      setErrorBoundary
    );

    if (isConnected) {
      socket.addListener<INots>(SocketEventsEnum.subscribe, onHandleSubscribe);

      socket.addListener<INots>(SocketEventsEnum.post, onHandleNewPost);
    }

    return () => {
      socket.removeListener<INots>(
        SocketEventsEnum.subscribe,
        onHandleSubscribe
      );

      socket.removeListener<INots>(SocketEventsEnum.post, onHandleNewPost);
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
        isLoading,
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
