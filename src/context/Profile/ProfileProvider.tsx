import { FC, createRef, useEffect, useState } from "react";

import { SocketApi } from "@/src/services";
import { getTokenFromLC } from "@/src/utils";
import { useAppSelector } from "@/src/redux";
import { NotificationType, SocketEvents } from "@/src/types";
import { ProfileContext } from "./hooks";
import { IProfileProviderProps } from "./ProfileProvider.type";

const tempData: NotificationType = {
  id: 0,
  avatarUrl: null,
  firstName: "Mattew",
  lastName: "Downroy",
  messageValue: "New post",
  eventType: SocketEvents.post,
  nodeRef: createRef(),
  keyId: Date.now(),
};
const socket = new SocketApi();

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
    const onHandleSubscribe = (e: string) => {
      const newNotifyObj: NotificationType = {
        avatarUrl: tempData.avatarUrl,
        id: tempData.id,
        firstName: tempData.firstName,
        lastName: tempData.lastName,
        messageValue: e,
        eventType: SocketEvents.subscribe,
        nodeRef: createRef(),
        keyId: Date.now(),
      };
      setNotifications((state) => [newNotifyObj, ...state]);
    };

    if (isConnected) {
      socket.addListener<string>(SocketEvents.subscribe, onHandleSubscribe);
    }

    return () => {
      socket.removeListener<string>(SocketEvents.subscribe, onHandleSubscribe);
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
